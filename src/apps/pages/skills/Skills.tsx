import Container from "@components/container";
import GridContainer from "@components/grid-container";
import GlassPanel from "@components/glass";
import {
  backend,
  dataBase,
  otherTools,
  skills,
  versionControl,
} from "@constants/content";

export default function Skills() {
  return (
    <Container>
      <GlassPanel className="p-6 sm:p-8 mb-8">
        <p className="text-3xl font-semibold tracking-tight mb-3">Skills</p>
        <p className="leading-relaxed">
          I build product-facing interfaces and the services behind them —
          React and TypeScript on the frontend, with Node.js, .NET Core, Python
          / FastAPI, PHP, and GraphQL where the problem needs them.
        </p>
      </GlassPanel>

      <section className="mb-8">
        <p className="font-semibold">Frontend</p>
        <GridContainer GridData={skills} />
      </section>
      <section className="mb-8">
        <p className="font-semibold">Backend & APIs</p>
        <GridContainer GridData={backend} />
      </section>
      <section className="mb-8">
        <p className="font-semibold">Database</p>
        <GridContainer GridData={dataBase} />
      </section>
      <section className="mb-8">
        <p className="font-semibold">Version Control</p>
        <GridContainer GridData={versionControl} />
      </section>
      <section>
        <p className="font-semibold">Tools</p>
        <GridContainer GridData={otherTools} />
      </section>
    </Container>
  );
}
