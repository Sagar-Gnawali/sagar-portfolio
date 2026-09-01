import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Theme } from "../../theme/ThemeProvider";

type Kind = "cyan" | "amber" | "violet";
type Depth = "fore" | "mid" | "back";
type Point2 = [number, number];

type TraceDef = {
  id: string;
  kind: Kind;
  points: Point2[];
  y?: number;
  radius?: number;
  bits?: number;
  speed?: number;
  depth?: Depth;
};

const CYAN_DARK = new THREE.Color("#5eead4");
const AMBER_DARK = new THREE.Color("#f5b942");
const VIOLET_DARK = new THREE.Color("#c084fc");
const CYAN_LIGHT = new THREE.Color("#0369a1");
const AMBER_LIGHT = new THREE.Color("#c2410c");
const VIOLET_LIGHT = new THREE.Color("#6d28d9");

function dist(a: Point2, b: Point2): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function lerp2(a: Point2, b: Point2, t: number): Point2 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function chamfer(points: Point2[], cut = 0.22): Point2[] {
  if (points.length < 3) return points;
  const first = points[0];
  if (!first) return points;
  const out: Point2[] = [first];
  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    if (!prev || !curr || !next) continue;
    const d1 = dist(prev, curr);
    const d2 = dist(curr, next);
    const r = Math.min(cut, d1 * 0.42, d2 * 0.42);
    if (r < 0.045) {
      out.push(curr);
      continue;
    }
    out.push(lerp2(curr, prev, r / d1), lerp2(curr, next, r / d2));
  }
  const last = points[points.length - 1];
  if (last) out.push(last);
  return out;
}

function rotate2(x: number, z: number, origin: Point2, rot: number): Point2 {
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  return [x * c - z * s + origin[0], x * s + z * c + origin[1]];
}

function arc(
  origin: Point2,
  rot: number,
  cx: number,
  cz: number,
  radius: number,
  a0: number,
  a1: number,
  steps = 8
): Point2[] {
  const pts: Point2[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const a = a0 + ((a1 - a0) * i) / steps;
    pts.push(
      rotate2(cx + Math.cos(a) * radius, cz + Math.sin(a) * radius, origin, rot)
    );
  }
  return pts;
}

function toVec3(points: Point2[], y: number): THREE.Vector3[] {
  return points.map(([x, z]) => new THREE.Vector3(x, y, z));
}

function makeCurve(points: THREE.Vector3[]): THREE.CurvePath<THREE.Vector3> {
  const curve = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 1; i < points.length; i += 1) {
    const start = points[i - 1];
    const end = points[i];
    if (!start || !end) continue;
    curve.add(new THREE.LineCurve3(start, end));
  }
  return curve;
}

function pathLength(points: THREE.Vector3[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    total += a.distanceTo(b);
  }
  return total;
}

function pointOnPath(
  points: THREE.Vector3[],
  t: number,
  target: THREE.Vector3
): THREE.Vector3 {
  const total = pathLength(points);
  const fallback = points[0] ?? new THREE.Vector3();
  if (total === 0) return target.copy(fallback);
  let remain = (((t % 1) + 1) % 1) * total;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    if (!a || !b) continue;
    const seg = a.distanceTo(b);
    if (remain <= seg) {
      return target.lerpVectors(a, b, seg === 0 ? 0 : remain / seg);
    }
    remain -= seg;
  }
  return target.copy(points[points.length - 1] ?? fallback);
}

function plusPad(
  id: string,
  kind: Kind,
  origin: Point2,
  size = 0.11,
  extras?: Partial<TraceDef>
): TraceDef[] {
  const [x, z] = origin;
  return [
    {
      id: `${id}-h`,
      kind,
      points: [
        [x - size, z],
        [x + size, z],
      ],
      radius: 0.011,
      bits: 0,
      ...extras,
    },
    {
      id: `${id}-v`,
      kind,
      points: [
        [x, z - size],
        [x, z + size],
      ],
      radius: 0.011,
      bits: 0,
      ...extras,
    },
  ];
}

function andGate(origin: Point2, rot: number): Point2[][] {
  const p = (x: number, z: number): Point2 => rotate2(x, z, origin, rot);
  return [
    [p(-0.78, 0.18), p(-0.16, 0.18)],
    [p(-0.78, -0.18), p(-0.16, -0.18)],
    [
      p(-0.16, 0.34),
      p(-0.16, -0.34),
      p(0.08, -0.34),
      ...arc(origin, rot, 0.08, 0, 0.34, -Math.PI / 2, Math.PI / 2, 9),
      p(-0.16, 0.34),
    ],
    [p(0.42, 0), p(0.98, 0)],
  ];
}

function orGate(origin: Point2, rot: number): Point2[][] {
  const p = (x: number, z: number): Point2 => rotate2(x, z, origin, rot);
  return [
    [p(-0.72, 0.2), p(-0.12, 0.2)],
    [p(-0.72, -0.2), p(-0.12, -0.2)],
    [
      p(-0.18, 0.36),
      p(0.08, 0.3),
      p(0.28, 0.16),
      p(0.4, 0),
      p(0.28, -0.16),
      p(0.08, -0.3),
      p(-0.18, -0.36),
    ],
    [p(-0.18, 0.36), p(-0.02, 0.1), p(-0.02, -0.1), p(-0.18, -0.36)],
    [p(0.4, 0), p(0.94, 0)],
  ];
}

function xorGate(origin: Point2, rot: number): Point2[][] {
  const p = (x: number, z: number): Point2 => rotate2(x, z, origin, rot);
  return [
    [p(-0.86, 0.2), p(-0.28, 0.2)],
    [p(-0.86, -0.2), p(-0.28, -0.2)],
    [p(-0.34, 0.36), p(-0.18, 0.1), p(-0.18, -0.1), p(-0.34, -0.36)],
    [
      p(-0.16, 0.36),
      p(0.1, 0.3),
      p(0.3, 0.16),
      p(0.42, 0),
      p(0.3, -0.16),
      p(0.1, -0.3),
      p(-0.16, -0.36),
    ],
    [p(-0.16, 0.36), p(0.0, 0.1), p(0.0, -0.1), p(-0.16, -0.36)],
    [p(0.42, 0), p(0.98, 0)],
  ];
}

function notGate(origin: Point2, rot: number): Point2[][] {
  const p = (x: number, z: number): Point2 => rotate2(x, z, origin, rot);
  return [
    [p(-0.7, 0), p(-0.16, 0)],
    [p(-0.16, 0.26), p(-0.16, -0.26), p(0.36, 0), p(-0.16, 0.26)],
    [p(0.36, 0), p(0.92, 0)],
  ];
}

function muxGate(origin: Point2, rot: number): Point2[][] {
  const p = (x: number, z: number): Point2 => rotate2(x, z, origin, rot);
  return [
    [p(-0.7, 0.28), p(-0.18, 0.28)],
    [p(-0.7, 0), p(-0.18, 0)],
    [p(-0.7, -0.28), p(-0.18, -0.28)],
    [
      p(-0.18, 0.42),
      p(-0.18, -0.42),
      p(0.38, -0.22),
      p(0.38, 0.22),
      p(-0.18, 0.42),
    ],
    [p(0.38, 0), p(0.92, 0)],
    [p(0.1, 0.42), p(0.1, 0.68)],
  ];
}

function push(
  list: TraceDef[],
  def: TraceDef,
  cut = 0.22
): void {
  list.push({
    ...def,
    points: cut > 0 ? chamfer(def.points, cut) : def.points,
  });
}

function buildMainTraces(): TraceDef[] {
  const traces: TraceDef[] = [];

  const leftZs = [0.52, 0.31, 0.1, -0.1, -0.31, -0.52];
  leftZs.forEach((z, i) => {
    const jog = i % 2 === 0 ? 0.55 : -0.42;
    push(traces, {
      id: `in-bus-${i}`,
      kind: "cyan",
      depth: i < 2 ? "fore" : "mid",
      points: [
        [-12.6, z + jog * 0.15],
        [-7.4, z + jog * 0.15],
        [-6.2, z],
        [-1.28, z],
      ],
      radius: i < 2 ? 0.024 : 0.018,
      bits: i % 2 === 0 ? 3 : 2,
      speed: 0.28 + i * 0.02,
    });
  });

  const rightZs = [0.52, 0.31, 0.1, -0.1, -0.31, -0.52];
  rightZs.forEach((z, i) => {
    const rise = i % 2 === 0 ? 0.7 : -0.55;
    push(traces, {
      id: `out-bus-${i}`,
      kind: "cyan",
      depth: i === 0 ? "fore" : "mid",
      points: [
        [1.28, z],
        [4.1, z],
        [5.3, z + rise],
        [8.6, z + rise],
        [9.6, z + rise * 0.45],
        [12.8, z + rise * 0.45],
      ],
      radius: i === 0 ? 0.024 : 0.017,
      bits: 3,
      speed: 0.26 + i * 0.018,
    });
  });

  for (let i = 0; i < 6; i += 1) {
    const z = 2.48 + i * 0.16;
    const jog = i % 2 === 0 ? 0.38 : -0.32;
    push(traces, {
      id: `near-field-${i}`,
      kind: i % 2 === 0 ? "cyan" : "amber",
      depth: "fore",
      y: i % 2 === 0 ? 0 : 0.04,
      points: [
        [-13.4, z],
        [-5.8, z],
        [-4.2, z + jog],
        [3.8, z + jog],
        [5.6, z],
        [13.4, z],
      ],
      radius: i === 0 ? 0.022 : 0.013,
      bits: i % 2 === 0 ? 3 : 2,
      speed: 0.2 + i * 0.01,
    });
  }

  for (let i = 0; i < 5; i += 1) {
    const z = 1.72 + i * 0.16;
    push(traces, {
      id: `north-bus-${i}`,
      kind: i % 2 === 0 ? "cyan" : "amber",
      depth: "fore",
      y: i % 2 === 0 ? 0 : 0.035,
      points: [
        [-12.4, z],
        [-4.8, z],
        [-3.6, z - 0.7],
        [-0.7 + i * 0.28, z - 0.7],
        [-0.7 + i * 0.28, 0.92],
      ],
      radius: 0.012,
      bits: i === 1 || i === 3 ? 2 : 1,
      speed: 0.24 + i * 0.012,
    });
  }

  for (let i = 0; i < 4; i += 1) {
    const z = -1.85 - i * 0.16;
    push(traces, {
      id: `south-bus-${i}`,
      kind: i === 0 ? "violet" : "amber",
      depth: "back",
      y: 0.03,
      points: [
        [-12.2, z],
        [-5.1, z],
        [-3.8, z + 0.62],
        [-0.55 + i * 0.26, z + 0.62],
        [-0.55 + i * 0.26, -0.92],
      ],
      radius: 0.013,
      bits: 2,
      speed: 0.22 + i * 0.015,
    });
  }

  for (let i = 0; i < 4; i += 1) {
    const z = -3.05 - i * 0.16;
    push(traces, {
      id: `far-field-${i}`,
      kind: i % 2 === 0 ? "cyan" : "violet",
      depth: "back",
      y: i % 2 === 0 ? 0 : 0.02,
      points: [
        [-13.0, z],
        [-6.4, z],
        [-4.8, z + (i % 2 === 0 ? 0.5 : -0.4)],
        [4.2, z + (i % 2 === 0 ? 0.5 : -0.4)],
        [6.0, z],
        [13.0, z],
      ],
      radius: 0.011,
      bits: i % 2 === 0 ? 2 : 1,
      speed: 0.18 + i * 0.01,
    });
  }

  push(traces, {
    id: "clk-a",
    kind: "amber",
    depth: "fore",
    y: 0.035,
    points: [
      [12.6, 1.05],
      [7.2, 1.05],
      [6.1, 0.35],
      [1.28, 0.35],
    ],
    radius: 0.02,
    bits: 3,
    speed: 0.25,
  });
  push(traces, {
    id: "clk-b",
    kind: "amber",
    depth: "mid",
    y: 0.035,
    points: [
      [12.6, 1.38],
      [7.6, 1.38],
      [6.4, 2.15],
      [1.6, 2.15],
      [1.6, 0.92],
    ],
    radius: 0.018,
    bits: 3,
    speed: 0.23,
  });
  push(traces, {
    id: "clk-c",
    kind: "amber",
    depth: "mid",
    y: 0.035,
    points: [
      [12.4, -0.85],
      [8.2, -0.85],
      [7.1, -1.7],
      [3.4, -1.7],
      [2.2, -0.52],
      [1.28, -0.52],
    ],
    radius: 0.017,
    bits: 2,
    speed: 0.27,
  });

  push(traces, {
    id: "diag-cyan",
    kind: "cyan",
    depth: "mid",
    points: [
      [-12.2, 2.55],
      [-8.4, 2.55],
      [-6.2, 0.35],
      [-1.28, 0.35],
    ],
    radius: 0.016,
    bits: 3,
    speed: 0.21,
  });
  push(traces, {
    id: "diag-amber",
    kind: "amber",
    depth: "back",
    y: 0.03,
    points: [
      [-12.0, -2.85],
      [-7.6, -2.85],
      [-5.4, -0.72],
      [-1.28, -0.72],
    ],
    radius: 0.016,
    bits: 2,
    speed: 0.2,
  });
  push(traces, {
    id: "diag-out",
    kind: "cyan",
    depth: "fore",
    points: [
      [1.28, -0.31],
      [3.6, -0.31],
      [5.8, 1.9],
      [12.5, 1.9],
    ],
    radius: 0.019,
    bits: 4,
    speed: 0.24,
  });
  push(traces, {
    id: "ribbon-se",
    kind: "cyan",
    depth: "back",
    points: [
      [1.28, -0.52],
      [2.8, -0.52],
      [2.8, -2.45],
      [6.4, -2.45],
      [6.4, -3.15],
      [12.4, -3.15],
    ],
    radius: 0.016,
    bits: 3,
    speed: 0.22,
  });

  for (let i = 0; i < 6; i += 1) {
    const z = -2.55 + i * 0.12;
    push(traces, {
      id: `dense-right-${i}`,
      kind: i % 3 === 0 ? "amber" : "cyan",
      depth: "back",
      y: i % 3 === 0 ? 0.03 : 0,
      points: [
        [7.15, z],
        [9.4, z],
        [10.2, z + (i % 2 === 0 ? 0.55 : -0.4)],
        [12.7, z + (i % 2 === 0 ? 0.55 : -0.4)],
      ],
      radius: 0.01,
      bits: i % 2 === 0 ? 1 : 0,
      speed: 0.19 + i * 0.01,
    });
  }

  const westRibbon = [-2.15, -2.02, -1.89, -1.76];
  westRibbon.forEach((z, i) => {
    push(traces, {
      id: `west-ribbon-${i}`,
      kind: "violet",
      depth: "back",
      y: 0.02,
      points: [
        [-12.5, z],
        [-6.8, z],
        [-5.6, z + 0.85],
        [-3.2, z + 0.85],
      ],
      radius: 0.01,
      bits: i === 1 ? 2 : 1,
      speed: 0.18 + i * 0.012,
    });
  });

  andGate([-3.55, 0.42], 0).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-and-${i}`,
        kind: "cyan",
        depth: "mid",
        points,
        radius: i === 2 ? 0.013 : 0.012,
        bits: i === 3 ? 1 : 0,
        speed: 0.32,
      },
      0
    );
  });
  orGate([3.55, -0.2], 0).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-or-${i}`,
        kind: "amber",
        depth: "mid",
        y: 0.03,
        points,
        radius: 0.012,
        bits: i === 4 ? 1 : 0,
        speed: 0.3,
      },
      0
    );
  });
  notGate([6.55, 1.05], 0).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-not-${i}`,
        kind: "cyan",
        depth: "fore",
        points,
        radius: 0.013,
        bits: i === 2 ? 1 : 0,
        speed: 0.34,
      },
      0
    );
  });
  xorGate([-3.85, -1.72], 0).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-xor-${i}`,
        kind: "violet",
        depth: "back",
        y: 0.02,
        points,
        radius: 0.011,
        bits: i === 5 ? 1 : 0,
        speed: 0.28,
      },
      0
    );
  });
  muxGate([4.85, -2.05], 0).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-mux-${i}`,
        kind: "amber",
        depth: "back",
        y: 0.03,
        points,
        radius: 0.011,
        bits: i === 4 ? 1 : 0,
        speed: 0.29,
      },
      0
    );
  });
  andGate([8.15, 0.55], -0.18).forEach((points, i) => {
    push(
      traces,
      {
        id: `gate-and-e-${i}`,
        kind: "cyan",
        depth: "mid",
        points,
        radius: 0.011,
        bits: 0,
        speed: 0.3,
      },
      0
    );
  });

  traces.push(
    ...plusPad("pad-in", "cyan", [-1.28, 0.1], 0.1, { depth: "mid" }),
    ...plusPad("pad-out", "cyan", [1.28, -0.1], 0.1, { depth: "mid" }),
    ...plusPad("pad-and", "cyan", [-2.55, 0.42], 0.09, { depth: "mid" }),
    ...plusPad("pad-or", "amber", [4.5, -0.2], 0.09, {
      depth: "mid",
      y: 0.03,
    }),
    ...plusPad("pad-not", "cyan", [7.45, 1.05], 0.08, { depth: "fore" }),
    ...plusPad("pad-xor", "violet", [-2.85, -1.72], 0.08, {
      depth: "back",
      y: 0.02,
    })
  );

  const pinZs = [-0.52, -0.31, -0.1, 0.1, 0.31, 0.52];
  pinZs.forEach((z, i) => {
    push(
      traces,
      {
        id: `pin-l-${i}`,
        kind: "cyan",
        depth: "mid",
        points: [
          [-1.04, z],
          [-1.28, z],
        ],
        radius: 0.015,
        bits: 0,
      },
      0
    );
    push(
      traces,
      {
        id: `pin-r-${i}`,
        kind: "cyan",
        depth: "mid",
        points: [
          [1.04, z],
          [1.28, z],
        ],
        radius: 0.015,
        bits: 0,
      },
      0
    );
  });
  const pinXs = [-0.7, -0.35, 0, 0.35, 0.7];
  pinXs.forEach((x, i) => {
    push(
      traces,
      {
        id: `pin-t-${i}`,
        kind: "amber",
        depth: "mid",
        y: 0.03,
        points: [
          [x, 0.72],
          [x, 0.94],
        ],
        radius: 0.013,
        bits: 0,
      },
      0
    );
    push(
      traces,
      {
        id: `pin-b-${i}`,
        kind: "amber",
        depth: "mid",
        y: 0.03,
        points: [
          [x, -0.72],
          [x, -0.94],
        ],
        radius: 0.013,
        bits: 0,
      },
      0
    );
  });

  return traces;
}

function buildGhostTraces(seed: string, zShift: number): TraceDef[] {
  const traces: TraceDef[] = [];
  for (let i = 0; i < 11; i += 1) {
    const z = -3.6 + i * 0.68 + zShift;
    const jog = i % 2 === 0 ? 0.9 : -0.75;
    push(traces, {
      id: `${seed}-h-${i}`,
      kind: i % 4 === 0 ? "amber" : i % 5 === 0 ? "violet" : "cyan",
      depth: "back",
      points: [
        [-15.5, z],
        [-7.2 + (i % 3), z],
        [-5.4 + (i % 3), z + jog],
        [2.2, z + jog],
        [4.4, z],
        [15.5, z],
      ],
      radius: 0.008 + (i % 3) * 0.002,
      bits: 0,
      speed: 0.12 + i * 0.006,
    });
  }
  for (let i = 0; i < 6; i += 1) {
    const x = -8 + i * 3.2;
    push(traces, {
      id: `${seed}-v-${i}`,
      kind: i % 2 === 0 ? "cyan" : "amber",
      depth: "back",
      points: [
        [x, -4.4],
        [x, -1.1],
        [x + (i % 2 === 0 ? 1.1 : -1.1), 1.4],
        [x + (i % 2 === 0 ? 1.1 : -1.1), 4.4],
      ],
      radius: 0.007,
      bits: 0,
      speed: 0.1,
    });
  }
  return traces;
}

const MAIN_TRACES = buildMainTraces();
const GHOST_NEAR = buildGhostTraces("gn", 0.2);
const GHOST_FAR = buildGhostTraces("gf", 0.55);

const traceVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const traceFragment = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uIntensity;
  void main() {
    float along = vUv.x;
    float around = vUv.y;
    float t0 = fract(along - uTime * uSpeed);
    float t1 = fract(along - uTime * uSpeed + 0.37);
    float t2 = fract(along - uTime * uSpeed + 0.71);
    float head0 = exp(-pow((t0 - 0.07) * 16.0, 2.0));
    float head1 = exp(-pow((t1 - 0.07) * 18.0, 2.0));
    float head2 = exp(-pow((t2 - 0.07) * 20.0, 2.0));
    float tail0 = smoothstep(0.42, 0.0, t0) * 0.32;
    float current = head0 * 2.15 + head1 * 1.55 + head2 * 1.2 + tail0;
    float rim = pow(abs(around - 0.5) * 2.0, 2.15);
    float core = 1.0 - rim;
    vec3 color = uColor * (uIntensity * (0.38 + core * 0.9) + current * (0.65 + core));
    color += uColor * rim * 0.2;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function makeBitTexture(digit: "0" | "1"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = "700 86px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(digit, 64, 72);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function pickColor(
  kind: Kind,
  cyan: THREE.Color,
  amber: THREE.Color,
  violet: THREE.Color
): THREE.Color {
  if (kind === "amber") return amber;
  if (kind === "violet") return violet;
  return cyan;
}

function depthBoost(depth: Depth): number {
  if (depth === "fore") return 1.18;
  if (depth === "back") return 0.58;
  return 1;
}

function TraceRun({
  points,
  radius,
  color,
  speed,
  intensity,
  time,
  glow,
}: {
  points: THREE.Vector3[];
  radius: number;
  color: THREE.Color;
  speed: number;
  intensity: number;
  time: { value: number };
  glow: boolean;
}) {
  const geometry = useMemo(() => {
    if (points.length < 2) return null;
    const curve = makeCurve(points);
    const length = Math.max(curve.getLength(), 0.01);
    return new THREE.TubeGeometry(
      curve,
      Math.max(12, Math.floor(length * 10)),
      radius,
      glow ? 6 : 4,
      false
    );
  }, [points, radius, glow]);

  const glowGeometry = useMemo(() => {
    if (!glow || points.length < 2) return null;
    const curve = makeCurve(points);
    const length = Math.max(curve.getLength(), 0.01);
    return new THREE.TubeGeometry(
      curve,
      Math.max(8, Math.floor(length * 6)),
      radius * 3.2,
      5,
      false
    );
  }, [points, radius, glow]);

  useEffect(() => {
    return () => {
      geometry?.dispose();
      glowGeometry?.dispose();
    };
  }, [geometry, glowGeometry]);

  if (!geometry) return null;

  return (
    <group>
      <mesh geometry={geometry}>
        <shaderMaterial
          vertexShader={traceVertex}
          fragmentShader={traceFragment}
          uniforms={{
            uColor: { value: color },
            uTime: time,
            uSpeed: { value: speed },
            uIntensity: { value: intensity },
          }}
          toneMapped={false}
        />
      </mesh>
      {glowGeometry ? (
        <mesh geometry={glowGeometry}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

function FlowingBits({
  traces,
  tex0,
  tex1,
  cyan,
  amber,
  violet,
  additive,
}: {
  traces: {
    points: THREE.Vector3[];
    kind: Kind;
    bits: number;
    worldSpeed: number;
    length: number;
  }[];
  tex0: THREE.CanvasTexture;
  tex1: THREE.CanvasTexture;
  cyan: THREE.Color;
  amber: THREE.Color;
  violet: THREE.Color;
  additive: boolean;
}) {
  const bits = useMemo(() => {
    const list: {
      trace: number;
      offset: number;
      digit: "0" | "1";
      kind: Kind;
    }[] = [];
    traces.forEach((trace, index) => {
      for (let i = 0; i < trace.bits; i += 1) {
        list.push({
          trace: index,
          offset: (i + 0.18) / Math.max(trace.bits, 1),
          digit: (i * 3 + index * 5) % 2 === 0 ? "1" : "0",
          kind: trace.kind,
        });
      }
    });
    return list;
  }, [traces]);

  const spriteRefs = useRef<Array<THREE.Sprite | null>>([]);
  const cursor = useRef(new THREE.Vector3());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    bits.forEach((bit, index) => {
      const sprite = spriteRefs.current[index];
      const trace = traces[bit.trace];
      if (!sprite || !trace || trace.length < 0.01) return;
      const u = bit.offset + (t * trace.worldSpeed) / trace.length;
      pointOnPath(trace.points, u, cursor.current);
      sprite.position.copy(cursor.current);
      sprite.position.y += 0.07;
      const pulse = 0.9 + Math.sin(t * 3.2 + index) * 0.08;
      sprite.scale.set(0.24 * pulse, 0.32 * pulse, 1);
    });
  });

  return (
    <group>
      {bits.map((bit, index) => (
        <sprite
          key={`${bit.trace}-${index}`}
          ref={(node) => {
            spriteRefs.current[index] = node;
          }}
          scale={[0.24, 0.32, 1]}
          renderOrder={2}
        >
          <spriteMaterial
            map={bit.digit === "0" ? tex0 : tex1}
            color={pickColor(bit.kind, cyan, amber, violet)}
            transparent
            depthWrite={false}
            toneMapped={false}
            blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

function Chip({ isDark }: { isDark: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[2.08, 0.09, 1.44]} />
        <meshStandardMaterial
          color={isDark ? "#0b1220" : "#cbd5e1"}
          metalness={0.78}
          roughness={0.26}
        />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[1.74, 0.02, 1.12]} />
        <meshBasicMaterial
          color={isDark ? "#155e75" : "#0369a1"}
          toneMapped={false}
          transparent
          opacity={0.42}
        />
      </mesh>
      <mesh position={[-0.62, 0.1, -0.38]}>
        <boxGeometry args={[0.18, 0.01, 0.18]} />
        <meshBasicMaterial
          color={isDark ? "#67e8f9" : "#0284c7"}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function GhostPlanes({
  cyan,
  amber,
  violet,
}: {
  cyan: THREE.Color;
  amber: THREE.Color;
  violet: THREE.Color;
}) {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2.12, 0.08, 0.04]}
        position={[-1.4, 0.14, 0.35]}
      >
        <planeGeometry args={[7.4, 4.2]} />
        <meshBasicMaterial
          color={cyan}
          transparent
          opacity={0.045}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2.28, -0.07, -0.03]}
        position={[3.6, 0.2, -0.7]}
      >
        <planeGeometry args={[6.1, 3.4]} />
        <meshBasicMaterial
          color={amber}
          transparent
          opacity={0.032}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2.4, 0.12, 0.08]}
        position={[-4.8, 0.08, -1.8]}
      >
        <planeGeometry args={[5.2, 2.8]} />
        <meshBasicMaterial
          color={violet}
          transparent
          opacity={0.04}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

type BuiltTrace = TraceDef & {
  points3: THREE.Vector3[];
  bits: number;
  worldSpeed: number;
  radius: number;
  depth: Depth;
  length: number;
  shaderSpeed: number;
};

function useBuiltTraces(defs: TraceDef[]): BuiltTrace[] {
  return useMemo(
    () =>
      defs.map((trace) => {
        const points3 = toVec3(trace.points, trace.y ?? 0);
        const length = Math.max(pathLength(points3), 0.01);
        const worldSpeed = trace.speed ?? 0.24;
        return {
          ...trace,
          points3,
          bits: trace.bits ?? 0,
          worldSpeed,
          radius: trace.radius ?? 0.016,
          depth: trace.depth ?? "mid",
          length,
          shaderSpeed: worldSpeed / length,
        };
      }),
    [defs]
  );
}

export default function CircuitScene({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const time = useMemo(() => ({ value: 0 }), []);

  const cyan = isDark ? CYAN_DARK : CYAN_LIGHT;
  const amber = isDark ? AMBER_DARK : AMBER_LIGHT;
  const violet = isDark ? VIOLET_DARK : VIOLET_LIGHT;
  const intensity = isDark ? 0.4 : 0.58;

  const traces = useBuiltTraces(MAIN_TRACES);
  const ghostNear = useBuiltTraces(GHOST_NEAR);
  const ghostFar = useBuiltTraces(GHOST_FAR);

  const textures = useMemo(() => {
    const tex0 = makeBitTexture("0");
    const tex1 = makeBitTexture("1");
    return { tex0, tex1 };
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      textures.tex0.dispose();
      textures.tex1.dispose();
    };
  }, [textures]);

  useFrame((state) => {
    time.value = state.clock.elapsedTime;
    const group = groupRef.current;
    if (!group) return;
    const sway = Math.sin(state.clock.elapsedTime * 0.06) * 0.02;
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -0.08 + mouse.current.y * 0.035,
      0.045
    );
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      0.12 + mouse.current.x * 0.06 + sway,
      0.045
    );
  });

  return (
    <group ref={groupRef} rotation={[-0.08, 0.12, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <planeGeometry args={[46, 26]} />
        <meshStandardMaterial
          color={isDark ? "#07090f" : "#e2e8f0"}
          roughness={0.94}
          metalness={0.1}
        />
      </mesh>
      <group position={[0.8, -0.92, -1.6]} scale={[1.7, 1, 1.7]}>
        {ghostFar.map((trace) => (
          <TraceRun
            key={trace.id}
            points={trace.points3}
            radius={trace.radius}
            color={pickColor(trace.kind, cyan, amber, violet)}
            speed={trace.shaderSpeed * 0.55}
            intensity={intensity * 0.22}
            time={time}
            glow={false}
          />
        ))}
      </group>
      <group position={[-0.4, -0.48, 0.7]} scale={[1.28, 1, 1.28]}>
        {ghostNear.map((trace) => (
          <TraceRun
            key={trace.id}
            points={trace.points3}
            radius={trace.radius}
            color={pickColor(trace.kind, cyan, amber, violet)}
            speed={trace.shaderSpeed * 0.7}
            intensity={intensity * 0.34}
            time={time}
            glow={false}
          />
        ))}
      </group>
      <GhostPlanes cyan={cyan} amber={amber} violet={violet} />
      <Chip isDark={isDark} />
      {traces.map((trace) => (
        <TraceRun
          key={trace.id}
          points={trace.points3}
          radius={trace.radius}
          color={pickColor(trace.kind, cyan, amber, violet)}
          speed={trace.shaderSpeed}
          intensity={intensity * depthBoost(trace.depth)}
          time={time}
          glow
        />
      ))}
      <FlowingBits
        traces={traces.map((trace) => ({
          points: trace.points3,
          kind: trace.kind,
          bits: trace.bits,
          worldSpeed: trace.worldSpeed,
          length: trace.length,
        }))}
        tex0={textures.tex0}
        tex1={textures.tex1}
        cyan={cyan}
        amber={amber}
        violet={violet}
        additive={isDark}
      />
    </group>
  );
}
