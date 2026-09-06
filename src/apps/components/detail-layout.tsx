import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Container from "@components/container";

export type DetailMetaItem = {
  icon: ReactNode;
  label: string;
};

export type DetailAction = {
  href: string;
  label: string;
  icon: ReactNode;
};

type DetailLayoutProps = {
  backTo: string;
  kicker: string;
  kickerIcon: ReactNode;
  title: string;
  titleSuffix?: string;
  subtitle: string;
  meta: DetailMetaItem[];
  action?: DetailAction;
  tags?: string[];
  tagsLabel?: string;
  tone?: "experience" | "education";
  isLoading: boolean;
  children: ReactNode;
};

function DetailSkeleton({
  tone = "experience",
}: {
  tone?: "experience" | "education";
}) {
  return (
    <Container className="detail-page">
      <div className={`detail-hero glass detail-hero--${tone}`}>
        <div className="skeleton-block h-8 w-20 mb-8" />
        <div className="flex items-center gap-2 mb-5">
          <div className="skeleton-block h-5 w-5 rounded-full" />
          <div className="skeleton-block h-4 w-28" />
        </div>
        <div className="skeleton-block h-10 w-4/5 mb-3" />
        <div className="skeleton-block h-4 w-1/3 mb-6" />
        <div className="flex gap-3 mb-8">
          <div className="skeleton-block h-5 w-36" />
          <div className="skeleton-block h-5 w-40" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="skeleton-block h-8 w-20 rounded-full" />
          <div className="skeleton-block h-8 w-28 rounded-full" />
          <div className="skeleton-block h-8 w-24 rounded-full" />
          <div className="skeleton-block h-8 w-16 rounded-full" />
        </div>
      </div>
      <div className="detail-shadow-line" aria-hidden="true" />
      <div className="detail-body">
        <div className="skeleton-block h-8 w-2/3 mb-5" />
        <div className="space-y-3">
          <div className="skeleton-block h-4 w-full" />
          <div className="skeleton-block h-4 w-11/12" />
          <div className="skeleton-block h-4 w-4/5" />
          <div className="skeleton-block h-4 w-10/12" />
        </div>
      </div>
    </Container>
  );
}

export default function DetailLayout({
  backTo,
  kicker,
  kickerIcon,
  title,
  titleSuffix,
  subtitle,
  meta,
  action,
  tags = [],
  tagsLabel = "Skills & Technologies",
  tone = "experience",
  isLoading,
  children,
}: DetailLayoutProps) {
  if (isLoading) {
    return <DetailSkeleton tone={tone} />;
  }

  return (
    <Container className="detail-page">
      <div className={`detail-hero glass detail-hero--${tone}`}>
        <Link to={backTo} className="experience-back">
          <FiArrowLeft size={16} />
          Back
        </Link>

        <p className="experience-kicker">
          {kickerIcon}
          {kicker}
        </p>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="min-w-0 flex-1">
            <h1 className="detail-title">
              {title}
              {titleSuffix ? (
                <span className="detail-title__org"> at {titleSuffix}</span>
              ) : null}
            </h1>
            <p className="detail-subtitle">{subtitle}</p>
            <div className="experience-meta">
              {meta.map((item) => (
                <span key={item.label}>
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          {action ? (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-company"
            >
              {action.icon}
              {action.label}
            </a>
          ) : null}
        </div>

        {tags.length > 0 ? (
          <div className="experience-skills">
            <h2>{tagsLabel}</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={tag}
                  className="skill-pill"
                  style={{ ["--i" as string]: String(index) }}
                >
                  <span className="skill-pill__dot" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="detail-shadow-line" aria-hidden="true" />

      <div className="detail-body">{children}</div>
    </Container>
  );
}
