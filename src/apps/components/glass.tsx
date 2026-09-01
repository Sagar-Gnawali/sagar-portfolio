import { useEffect, useRef } from "react";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={`glass ${className}`.trim()}>
      {children}
    </div>
  );
}
