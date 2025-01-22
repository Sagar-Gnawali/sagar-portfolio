import Container from "../../components/container";
import TimeLine from "../../components/timeline";
export default function Work() {
  const workExperience = [
    {
      company: {
        name: "Fatdog Technology Pvt.",
        duration: "Aug 2024 - Present",
        role: "Frontend Developer",
      },
      contribute: [
        "Build module in healthcare system to support dynamic forms for various diseases, improving flexibility and usability.",
        "Worked on an e-commerce platform using Next.js to deliver a seamless shopping experience.",
        "Worked on an e-commerce admin portal using Vue.js to streamline management tasks.",
        "Worked on an online test booking portal using Next.js to simplify the booking process for users.",
      ],
    },
    {
      company: {
        name: "LogicaBeans Pvt. Ltd.",
        duration: "Oct 2021 - Jul 2024",
        role: "Software Engineer",
      },
      contribute: [
        "Engaged as an offshore developer for a USA healthcare portal, focusing on implementing business rules using ReactJS, TypeScript, and GraphQL.",
        "Involved in frontend development of multi-tenant healthcare portal systems using React JS and Typescript.",
        "Contributed to Loan Management System development using Dot Net Core and React JS.",
      ],
    },
    {
      company: {
        name: "Influence | Target Solutions India",
        duration: "Jul 2021 - Sep 2021",
        role: "Software Engineer Trainee",
      },
      contribute: [
        "Developed user interfaces using React JS.",
        "nvolved in frontend development of multi-tenant healthcare portal systems using React JS and Typescript.",
        "Maintained/improved existing codebases while conducting peer code reviews.",
      ],
    },
  ];
  return (
    <Container>
      <div>
        <p className="text-2xl leading-1 mb-3 capitalize ml-1">experience</p>
        {workExperience.map((it, index) => (
          <TimeLine
            key={index}
            company={it.company}
            contribute={it.contribute}
          />
        ))}
      </div>
    </Container>
  );
}
