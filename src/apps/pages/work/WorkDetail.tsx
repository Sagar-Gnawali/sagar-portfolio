import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Container from "@components/container";
import DetailLayout from "@components/detail-layout";
import { getExperienceById } from "@constants/content";

const DETAIL_LOAD_MS = 800;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function WorkDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const experience = getExperienceById(slug);
  const [readySlug, setReadySlug] = useState<string | null>(null);

  useEffect(() => {
    const delay = prefersReducedMotion() ? 0 : DETAIL_LOAD_MS;
    const timer = window.setTimeout(() => setReadySlug(slug), delay);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!experience) {
    return (
      <Container>
        <Link to="/work" className="experience-back">
          <FiArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-6">
          Experience not found
        </h1>
        <p className="muted mt-2">
          No role matches <span className="font-mono">{slug}</span>. Try{" "}
          <Link to="/work/logica-2024">logica-2024</Link> or{" "}
          <Link to="/work/adtecher-2026">adtecher-2026</Link>.
        </p>
      </Container>
    );
  }

  const { company, description, skills, domains, subsection } = experience;
  const heading = `${company.role} at ${company.name}`;

  return (
    <DetailLayout
      backTo="/work"
      kicker="Experience"
      kickerIcon={<HiOutlineBuildingOffice2 size={16} aria-hidden="true" />}
      title={company.role}
      titleSuffix={company.name}
      subtitle={company.name}
      meta={[
        {
          icon: <FiCalendar size={15} aria-hidden="true" />,
          label: company.duration,
        },
        {
          icon: <HiOutlineBuildingOffice2 size={15} aria-hidden="true" />,
          label: company.name,
        },
      ]}
      action={
        company.url
          ? {
              href: company.url,
              label: "Visit Company",
              icon: <HiOutlineBuildingOffice2 size={16} aria-hidden="true" />,
            }
          : undefined
      }
      tags={skills}
      tone="experience"
      isLoading={readySlug !== slug}
    >
      <h2 className="detail-body__heading">{heading}</h2>
      {description.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="detail-body__copy">
          {paragraph}
        </p>
      ))}

      {experience.contribute.length > 0 ? (
        <ul className="detail-highlights">
          {experience.contribute.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {domains && domains.length > 0 ? (
        <div className="mt-8">
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
        <div className="subsection mt-6">
          <p className="text-sm font-semibold mb-1">{subsection.title}</p>
          <p className="text-sm leading-relaxed muted">{subsection.description}</p>
        </div>
      ) : null}
    </DetailLayout>
  );
}
