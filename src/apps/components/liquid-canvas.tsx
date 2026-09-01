import type { MutableRefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme, type Theme } from "../../theme/ThemeProvider";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDark;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.52;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.18;
    float t = uTime * 0.08;

    vec2 p = uv * 2.4 - 1.2;
    p += mouse;
    float n = fbm(p * 1.4 + vec2(t * 0.7, t * 0.45));
    float n2 = fbm(p * 2.1 - vec2(t * 0.35, -t * 0.5) + n);

    vec3 color = mix(uColorA, uColorB, n);
    color = mix(color, uColorC, n2 * 0.85);
    color = mix(color, uColorD, smoothstep(0.35, 0.9, n * n2));

    float vignette = smoothstep(1.15, 0.25, length(uv - 0.5));
    color *= mix(0.88, 1.0, vignette);
    color += vec3(0.08, 0.1, 0.14) * (1.0 - uDark) * n2 * 0.35;

    gl_FragColor = vec4(color, 1.0);
  }
`;

type Palette = {
  a: THREE.Color;
  b: THREE.Color;
  c: THREE.Color;
  d: THREE.Color;
  orbs: string[];
  particles: string;
};

function getPalette(isDark: boolean): Palette {
  if (isDark) {
    return {
      a: new THREE.Color("#07080d"),
      b: new THREE.Color("#15233d"),
      c: new THREE.Color("#12363f"),
      d: new THREE.Color("#2a1848"),
      orbs: ["#7dd3fc", "#c4b5fd", "#fda4af"],
      particles: "#e2e8f0",
    };
  }
  return {
    a: new THREE.Color("#eef2f7"),
    b: new THREE.Color("#d7e6ff"),
    c: new THREE.Color("#f8e4d6"),
    d: new THREE.Color("#ead9ff"),
    orbs: ["#60a5fa", "#c084fc", "#fb923c"],
    particles: "#64748b",
  };
}

function LiquidField({
  isDark,
  mouseTarget,
}: {
  isDark: boolean;
  mouseTarget: MutableRefObject<THREE.Vector2>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const palette = useMemo(() => getPalette(isDark), [isDark]);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    mouse.current.lerp(mouseTarget.current, 0.045);
    material.uniforms.uMouse.value.copy(mouse.current);
    material.uniforms.uDark.value = isDark ? 1 : 0;
    material.uniforms.uColorA.value.copy(palette.a);
    material.uniforms.uColorB.value.copy(palette.b);
    material.uniforms.uColorC.value.copy(palette.c);
    material.uniforms.uColorD.value.copy(palette.d);
  });

  return (
    <mesh scale={[18, 12, 1]} position={[0, 0, -6]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uDark: { value: isDark ? 1 : 0 },
          uColorA: { value: palette.a.clone() },
          uColorB: { value: palette.b.clone() },
          uColorC: { value: palette.c.clone() },
          uColorD: { value: palette.d.clone() },
        }}
      />
    </mesh>
  );
}

function GlassOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.18;
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={0.38}
        speed={1.6}
        roughness={0.12}
        metalness={0.18}
        transparent
        opacity={0.58}
      />
    </mesh>
  );
}

function Particles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color={color}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const palette = useMemo(() => getPalette(isDark), [isDark]);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseTarget.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <LiquidField isDark={isDark} mouseTarget={mouseTarget} />
      <ambientLight intensity={isDark ? 0.35 : 0.7} />
      <pointLight
        position={[2.4, 2.2, 3]}
        intensity={isDark ? 18 : 10}
        color={palette.orbs[0]}
      />
      <pointLight
        position={[-3, -1.4, 2]}
        intensity={isDark ? 12 : 7}
        color={palette.orbs[1]}
      />
      <GlassOrb
        position={[-2.1, 0.7, -0.4]}
        color={palette.orbs[0]}
        scale={1.35}
        speed={0.55}
      />
      <GlassOrb
        position={[2.3, -0.35, 0.2]}
        color={palette.orbs[1]}
        scale={0.95}
        speed={0.7}
      />
      <GlassOrb
        position={[0.15, 1.35, -1.1]}
        color={palette.orbs[2]}
        scale={0.62}
        speed={0.9}
      />
      <Particles color={palette.particles} />
    </>
  );
}

export default function LiquidCanvas() {
  const { theme } = useTheme();
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  if (reduceMotion) {
    return <div className="liquid-fallback" aria-hidden="true" />;
  }

  return (
    <div className="liquid-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}
