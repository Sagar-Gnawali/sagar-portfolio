import Container from "@components/container";
import TimeLine from "@components/timeline";
import { workExperience } from "@constants/content";

export default function Work() {
  return (
    <Container>
      <p className="text-2xl font-semibold tracking-tight mb-2">Experience</p>
      <p className="muted mb-6 text-sm leading-relaxed">
        Click a role to open the full write-up.
      </p>
      {workExperience.map((item, index) => (
        <TimeLine key={item.id} index={index} {...item} />
      ))}
    </Container>
  );
}
