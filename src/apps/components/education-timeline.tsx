import GlassPanel from "@components/glass";

export function EducationTimeLine() {
  return (
    <section>
      <p className="text-2xl font-semibold tracking-tight mb-4">Education</p>
      <div className="space-y-4">
        <GlassPanel className="p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h3 className="font-medium">BPP University</h3>
            <span className="muted text-sm">2026 - Present</span>
          </div>
          <p className="text-sm mt-2">MSc Management with Data Analytics</p>
          <p className="muted text-sm">1 Portsoken St, London E1 8BT</p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h3 className="font-medium">IK Gujral Punjab Technical University</h3>
            <span className="muted text-sm">2017 - 2021</span>
          </div>
          <p className="muted text-xs mt-1">Punjab Technical University affiliated</p>
          <p className="text-sm mt-2">
            B.Tech (Bachelors in Computer Science Engineering)
          </p>
          <p className="muted text-sm">Kapurthala, Punjab, India</p>
        </GlassPanel>
      </div>
    </section>
  );
}
