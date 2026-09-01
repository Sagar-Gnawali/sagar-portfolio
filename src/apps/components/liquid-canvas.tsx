import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useTheme } from "../../theme/ThemeProvider";
import CircuitScene from "./circuit-scene";

export default function LiquidCanvas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const bg = isDark ? "#05070c" : "#e8eef6";

  if (reduceMotion) {
    return <div className="liquid-fallback" aria-hidden="true" />;
  }

  return (
    <div className="liquid-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0.18, 1.38, 4.28], fov: 42, near: 0.1, far: 60 }}
        flat
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0.14, -1.15);
        }}
      >
        <color attach="background" args={[bg]} />
        <fog attach="fog" args={[bg, 5.8, 16]} />
        <ambientLight intensity={isDark ? 0.14 : 0.52} />
        <pointLight
          position={[5.2, 3.6, 2.4]}
          intensity={isDark ? 11 : 6}
          color={isDark ? "#67e8f9" : "#38bdf8"}
        />
        <pointLight
          position={[-4.6, 3.2, 1.2]}
          intensity={isDark ? 8 : 4}
          color={isDark ? "#f5b942" : "#f97316"}
        />
        <pointLight
          position={[-6.2, 2.2, -2.8]}
          intensity={isDark ? 5 : 2.2}
          color={isDark ? "#c084fc" : "#7c3aed"}
        />
        <directionalLight
          position={[0, 7.5, 4]}
          intensity={isDark ? 0.28 : 0.55}
        />
        <CircuitScene theme={theme} />
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            luminanceThreshold={isDark ? 0.14 : 0.3}
            luminanceSmoothing={0.28}
            intensity={isDark ? 1.28 : 0.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.28} darkness={isDark ? 0.62 : 0.28} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
