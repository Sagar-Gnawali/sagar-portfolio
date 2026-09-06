import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiAward, FiCalendar } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import Container from "@components/container";
import DetailLayout from "@components/detail-layout";
import { getEducationById } from "@constants/content";

const DETAIL_LOAD_MS = 800;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function EducationDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const item = getEducationById(slug);
  const [readySlug, setReadySlug] = useState<string | null>(null);

  useEffect(() => {
    const delay = prefersReducedMotion() ? 0 : DETAIL_LOAD_MS;
    const timer = window.setTimeout(() => setReadySlug(slug), delay);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!item) {
    return (
      <Container>
        <Link to="/education" className="experience-back">
          <FiArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-6">
          Education not found
        </h1>
        <p className="muted mt-2">
          No programme matches <span className="font-mono">{slug}</span>. Try{" "}
          <Link to="/education/msc-2026">msc-2026</Link> or{" "}
          <Link to="/education/cse-2021">cse-2021</Link>.
        </p>
      </Container>
    );
  }

  const { school, description, skills, terms, extraModules, note, degreeType } =
    item;

  return (
    <DetailLayout
      backTo="/education"
      kicker="Education"
      kickerIcon={<HiOutlineAcademicCap size={16} aria-hidden="true" />}
      title={school.program}
      subtitle={school.name}
      meta={[
        {
          icon: <FiCalendar size={15} aria-hidden="true" />,
          label: school.duration,
        },
        {
          icon: <HiOutlineAcademicCap size={15} aria-hidden="true" />,
          label: school.name,
        },
        {
          icon: <FiAward size={15} aria-hidden="true" />,
          label: degreeType,
        },
      ]}
      action={
        school.url
          ? {
              href: school.url,
              label: "Visit Institution",
              icon: <HiOutlineAcademicCap size={16} aria-hidden="true" />,
            }
          : undefined
      }
      tags={skills}
      tone="education"
      isLoading={readySlug !== slug}
    >
      <h2 className="detail-body__heading">{school.program}</h2>
      <p className="detail-body__copy">{description}</p>

      {school.affiliation ? (
        <p className="muted text-sm mt-3">{school.affiliation}</p>
      ) : null}
      {school.location ? (
        <p className="muted text-sm mt-1">{school.location}</p>
      ) : null}

      {terms && terms.length > 0 ? (
        <div className="detail-terms">
          {terms.map((term) => (
            <section key={term.title} className="detail-term">
              <h3>{term.title}</h3>
              <ul>
                {term.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}

      {extraModules && extraModules.length > 0 ? (
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider muted mb-3">
            Modules covered
          </p>
          <div className="flex flex-wrap gap-2">
            {extraModules.map((module, index) => (
              <span
                key={module}
                className="skill-pill skill-pill--static"
                style={{ ["--i" as string]: String(index) }}
              >
                <span className="skill-pill__dot" aria-hidden="true" />
                {module}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {note ? <p className="detail-body__copy mt-6">{note}</p> : null}
    </DetailLayout>
  );
}
