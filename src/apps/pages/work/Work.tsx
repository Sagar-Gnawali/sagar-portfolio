import Container from "@components/container";
import TimeLine from "@components/timeline";
import { workExperience } from "@constants/content";

export default function Work() {
  return (
    <Container>
      <p className="text-2xl font-semibold tracking-tight mb-5">Experience</p>
      {workExperience.map((item) => (
        <TimeLine
          key={item.company.name}
          company={item.company}
          contribute={item.contribute}
          domains={item.domains}
          subsection={item.subsection}
          stack={item.stack}
        />
      ))}
    </Container>
  );
}
