import Container from "../../components/container";

export default function About() {
  return (
    <Container  className="">
      <div className="">
        <p className="text-6xl leading-1 mb-3 capitalize">about</p>
        <p className="leading-1">
          I am a talented Software Engineer with expertise in frontend
          development using React and TypeScript. I have a passion for building
          high-quality applications that are both efficient and user-friendly. I
          possess strong problem-solving skills, and I am always eager to learn
          new technologies to stay ahead of the curve.
        </p>
        <p className="leading-1 mt-2">
          In my free time, I enjoy reading books. These
          interests allow me to decompress and clear my mind, so I can come back
          to coding with a fresh perspective.
        </p>
        <div className="my-3">
          <p className="font-semibold">Frameworks:</p>
        </div>
      </div>
    </Container>
  );
}
