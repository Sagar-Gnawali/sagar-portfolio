import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import type { WorkExperience } from "@constants/content";

type TimeLineProps = WorkExperience & {
  index: number;
};

export default function TimeLine({
  id,
  company,
  skills,
  index,
}: TimeLineProps) {
  const previewSkills = skills.slice(0, 6);
  const extraCount = skills.length - previewSkills.length;

  return (
    <Link
      to={`/work/${id}`}
      className="experience-card glass timeline-card"
      style={{ ["--i" as string]: String(index) }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight">{company.role}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mt-1">
            <p className="muted text-sm">{company.name}</p>
            <span className="muted text-sm">{company.duration}</span>
          </div>
        </div>
        <FiArrowRight className="experience-card__arrow muted shrink-0 mt-1" size={18} />
      </div>

      {previewSkills.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider muted mb-2">
            Skills & Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {previewSkills.map((item) => (
              <span key={item} className="stack-chip">
                {item}
              </span>
            ))}
            {extraCount > 0 ? (
              <span className="stack-chip">+{extraCount} more</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </Link>
  );
}
