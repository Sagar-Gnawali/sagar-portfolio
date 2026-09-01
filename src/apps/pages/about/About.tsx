import Container from "@components/container";
import GridContainer from "@components/grid-container";
import { EducationTimeLine } from "@components/education-timeline";
import GlassPanel from "@components/glass";
import {
  backend,
  dataBase,
  otherTools,
  skills,
  versionControl,
} from "@constants/content";

export default function About() {
  return (
    <Container>
      <GlassPanel className="p-6 sm:p-8 mb-8">
        <p className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m Sagar Gnawali
        </p>
        <p className="muted mt-2">
          a Software Engineer trying to make the world a bit more functional. 🇳🇵
        </p>
        <p className="mt-4 leading-relaxed">
          It&apos;s been 4 years of making computers do what I want. Sometimes
          they listen, sometimes they don&apos;t... but we always figure it out.
        </p>
        <p className="mt-3 leading-relaxed">
          Outside of convincing computers to work, I read books, go trekking,
          and take photos. Check out my{" "}
          <a
            href="https://www.pexels.com/@sagar-gnawali-1389137/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels profile
          </a>{" "}
          if you want to see what I do when I&apos;m not debugging.
        </p>
      </GlassPanel>

      <div className="mb-8">
        <p className="font-semibold">Frontend</p>
        <GridContainer GridData={skills} />
      </div>
      <div className="mb-8">
        <p className="font-semibold">Backend & APIs</p>
        <GridContainer GridData={backend} />
      </div>
      <div className="mb-8">
        <p className="font-semibold">Version Control</p>
        <GridContainer GridData={versionControl} />
      </div>
      <div className="mb-8">
        <p className="font-semibold">Database</p>
        <GridContainer GridData={dataBase} />
      </div>
      <div className="mb-8">
        <p className="font-semibold">Tools</p>
        <GridContainer GridData={otherTools} />
      </div>
      <EducationTimeLine />
    </Container>
  );
}
