import type { WorkExperience } from "@constants/content";

type TimeLineProps = WorkExperience;

export default function TimeLine({
  company,
  contribute,
  domains,
  subsection,
  stack,
}: TimeLineProps) {
  return (
    <article className="glass timeline-card">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="text-lg font-semibold tracking-tight">{company.name}</h3>
        <span className="muted text-sm">{company.duration}</span>
      </div>
      <p className="muted text-sm capitalize mb-3">{company.role}</p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
        {contribute.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {domains && domains.length > 0 ? (
        <div className="mt-4 mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider muted mb-2">
            Domains
          </p>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span key={domain} className="domain-chip">
                {domain}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {subsection ? (
        <div className="subsection">
          <p className="text-sm font-semibold mb-1">{subsection.title}</p>
          <p className="text-sm leading-relaxed muted">{subsection.description}</p>
        </div>
      ) : null}

      {stack && stack.length > 0 ? (
        <div className="mt-3 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider muted mb-2">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="stack-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
