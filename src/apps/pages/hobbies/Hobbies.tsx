import Container from "@components/container";
import GlassPanel from "@components/glass";

const hobbies = [
  {
    title: "Photography",
    body: "I shoot when I am not debugging. Frames live on Pexels.",
    href: "https://www.pexels.com/@sagar-gnawali-1389137/",
    label: "Pexels profile",
  },
  {
    title: "Books",
    body: "Reading is how I reset — then I come back to the editor clearer.",
  },
  {
    title: "Trekking",
    body: "Trails over tabs, when the weather and a weekend line up.",
  },
];

export default function Hobbies() {
  return (
    <Container>
      <p className="text-2xl font-semibold tracking-tight mb-5">Hobbies</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {hobbies.map((hobby) => (
          <GlassPanel key={hobby.title} className="p-5">
            <h2 className="font-semibold mb-2">{hobby.title}</h2>
            <p className="muted text-sm leading-relaxed">{hobby.body}</p>
            {"href" in hobby && hobby.href ? (
              <a
                className="inline-block mt-3 text-sm"
                href={hobby.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hobby.label}
              </a>
            ) : null}
          </GlassPanel>
        ))}
      </div>
    </Container>
  );
}
