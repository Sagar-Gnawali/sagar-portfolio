import type { SkillItem } from "@constants/content";

type GridContainerProps = {
  GridData: SkillItem[];
};

export default function GridContainer({ GridData }: GridContainerProps) {
  return (
    <div className="skill-grid mt-3">
      {GridData.map((item) => (
        <div key={item.name} className="skill-chip">
          <span className="flex items-center" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
