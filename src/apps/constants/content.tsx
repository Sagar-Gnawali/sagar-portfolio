import { FaReact, FaSass, FaTrello, FaPhp, FaNodeJs, FaPython } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";
import {
  TbBrandBitbucket,
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
} from "react-icons/tb";
import {
  LiaGithubSquare,
  LiaConfluence,
  LiaSourcetree,
  LiaDocker,
} from "react-icons/lia";
import {
  SiZoho,
  SiPostgresql,
  SiPostman,
  SiClickup,
  SiJira,
  SiMysql,
  SiDotnet,
  SiFastapi,
} from "react-icons/si";

import { ImHtmlFive2 } from "react-icons/im";
import { RiJavascriptLine } from "react-icons/ri";
import { BsFiletypeSql } from "react-icons/bs";
import { FiGitlab } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";

import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export type SkillItem = {
  name: string;
  icon: JSX.Element;
};

export type WorkExperience = {
  company: {
    name: string;
    duration: string;
    role: string;
  };
  contribute: string[];
  domains?: string[];
  subsection?: {
    title: string;
    description: string;
  };
  stack?: string[];
};

export const dataBase: SkillItem[] = [
  {
    name: "MySQL",
    icon: <SiMysql size={22} />,
  },
  {
    name: "T-SQL",
    icon: <BsFiletypeSql size={20} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={20} />,
  },
];

export const skills: SkillItem[] = [
  {
    name: "React",
    icon: <FaReact size={20} />,
  },
  {
    name: "Next.js",
    icon: <TbBrandNextjs size={20} />,
  },
  {
    name: "TypeScript",
    icon: <TbBrandTypescript size={20} />,
  },
  {
    name: "JavaScript",
    icon: <RiJavascriptLine size={22} />,
  },
  {
    name: "HTML, CSS",
    icon: <ImHtmlFive2 size={20} />,
  },
  {
    name: "SASS",
    icon: <FaSass size={20} />,
  },
  {
    name: "Tailwind CSS",
    icon: <TbBrandTailwind size={20} />,
  },
];

export const backend: SkillItem[] = [
  {
    name: "Node.js",
    icon: <FaNodeJs size={20} />,
  },
  {
    name: ".NET Core",
    icon: <SiDotnet size={20} />,
  },
  {
    name: "Python",
    icon: <FaPython size={20} />,
  },
  {
    name: "FastAPI",
    icon: <SiFastapi size={20} />,
  },
  {
    name: "PHP",
    icon: <FaPhp size={22} />,
  },
  {
    name: "GraphQL",
    icon: <BiLogoGraphql size={20} />,
  },
];

export const versionControl: SkillItem[] = [
  {
    name: "Git",
    icon: <FaGitAlt size={20} />,
  },
  {
    name: "GitHub",
    icon: <LiaGithubSquare size={22} />,
  },
  {
    name: "GitLab",
    icon: <FiGitlab size={22} />,
  },
  {
    name: "BitBucket",
    icon: <TbBrandBitbucket size={20} />,
  },
];

export const otherTools: SkillItem[] = [
  {
    name: "Postman",
    icon: <SiPostman size={20} />,
  },
  {
    name: "Jira",
    icon: <SiJira size={20} />,
  },
  {
    name: "Confluence",
    icon: <LiaConfluence size={20} />,
  },
  {
    name: "ClickUp",
    icon: <SiClickup size={20} />,
  },
  {
    name: "Zoho",
    icon: <SiZoho size={22} />,
  },
  {
    name: "Docker",
    icon: <LiaDocker size={22} />,
  },
  {
    name: "Source Tree",
    icon: <LiaSourcetree size={22} />,
  },
  {
    name: "Trello",
    icon: <FaTrello size={20} />,
  },
];

export const socialLinks = [
  { icon: <MdEmail size={22} />, url: "mailto:sagargnawali2@gmail.com" },
  { icon: <IoLogoGithub size={22} />, url: "https://github.com/Sagar-Gnawali" },
  {
    icon: <IoLogoLinkedin size={22} />,
    url: "https://www.linkedin.com/in/sagar-gnawali-41b500190",
  },
];

export const workExperience: WorkExperience[] = [
  {
    company: {
      name: "AdTecher",
      duration: "Jan 2026 - May 2026",
      role: "Founding Engineer",
    },
    contribute: [
      "Developed modern React + TypeScript UIs for analytics dashboards and chat/briefing experiences, including reusable components, charts, onboarding flows, and stateful views.",
      "Helped evolve project architecture using domain-driven principles, organizing code into clear domain modules and shared core infrastructure.",
    ],
  },
  {
    company: {
      name: "Vynspire AI Labs",
      duration: "Aug 2025 - Nov 2025",
      role: "Software Engineer",
    },
    contribute: [
      "Implemented payment gateway integrations (Stripe and PayPal) in a hotel booking platform, ensuring secure and seamless checkout experiences.",
      "Built reusable components and modules for a hotel booking system using Next.js, improving code maintainability and development efficiency.",
      "Managed multiple environments on AWS Amplify for a hotel booking system, ensuring smooth testing and deployment workflows across development and staging environments.",
    ],
  },
  {
    company: {
      name: "Fatdog Technology Pvt.",
      duration: "Aug 2024 - Mar 2025",
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
      "Involved in frontend development of multi-tenant healthcare portal systems using React JS and TypeScript.",
      "Contributed to Loan Management System development using .NET Core and React JS.",
    ],
    domains: [
      "Hospitality",
      "Time Management",
      "Financial Management",
      "Date Booking",
      "Healthcare Portal · Multitenant",
    ],
    subsection: {
      title: "Singapore client · Part-time",
      description:
        "Alongside core delivery, maintained multiple production modules for a Singapore-based client using PhpRunner — feature updates, module-level fixes, and ongoing operational support across the client's systems.",
    },
    stack: [
      "GraphQL",
      "T-SQL",
      ".NET Core",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "FastAPI",
      "PHP",
      "Node.js",
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
      "Maintained and improved existing codebases while conducting peer code reviews.",
    ],
  },
];
