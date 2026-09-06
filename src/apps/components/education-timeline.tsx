import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { education } from "@constants/content";

type EducationTimeLineProps = {
  showIntro?: boolean;
};

export function EducationTimeLine({ showIntro = false }: EducationTimeLineProps) {
  return (
    <section>
      <p className="text-2xl font-semibold tracking-tight mb-2">Education</p>
      {showIntro ? (
        <p className="muted mb-6 text-sm leading-relaxed">
          Click a programme to open the full write-up.
        </p>
      ) : (
        <div className="mb-4" />
      )}
      {education.map((item, index) => {
        const previewSkills = item.skills.slice(0, 6);
        const extraCount = item.skills.length - previewSkills.length;

        return (
          <Link
            key={item.id}
            to={`/education/${item.id}`}
            className="experience-card glass timeline-card"
            style={{ ["--i" as string]: String(index) }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.school.program}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mt-1">
                  <p className="muted text-sm">{item.school.name}</p>
                  <span className="muted text-sm">{item.school.duration}</span>
                </div>
                {item.school.location ? (
                  <p className="muted text-xs mt-1">{item.school.location}</p>
                ) : null}
              </div>
              <FiArrowRight
                className="experience-card__arrow muted shrink-0 mt-1"
                size={18}
              />
            </div>

            {previewSkills.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider muted mb-2">
                  Skills & Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {previewSkills.map((skill) => (
                    <span key={skill} className="stack-chip">
                      {skill}
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
      })}
    </section>
  );
}
