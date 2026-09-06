import {
  FaReact,
  FaSass,
  FaTrello,
  FaPhp,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
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
  id: string;
  company: {
    name: string;
    duration: string;
    role: string;
    url?: string;
  };
  contribute: string[];
  description: string;
  domains?: string[];
  subsection?: {
    title: string;
    description: string;
  };
  skills: string[];
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
    id: "adtecher-2026",
    company: {
      name: "AdTecher",
      duration: "Jan 2026 — May 2026",
      role: "Founding Engineer",
      url: "https://adtecher.com",
    },
    contribute: [
      "Built a chat agent that works across Anthropic, DeepSeek, and Llama, with Node.js on the backend and React 19 and Next.js 16 on the frontend.",
      "Designed dashboards for different use cases so the interface stayed clear and easy to scan.",
      "Developed a Chrome extension that observes in-product activity, collects useful data, and automates follow-up actions from that data.",
      "Optimized the TypeScript codebase so the chat and dashboard stayed fast as the product grew.",
    ],
    description:
      "At AdTecher I worked on the chat agent, the dashboards, and a Chrome extension. The agent uses Anthropic, DeepSeek, and Llama. The dashboards cover different day-to-day use cases. The extension observes in-product activity and uses that data to automate follow-up work.\n\nThe stack was React 19, Next.js 16, TypeScript, and Node.js. The focus was a fast chat interface, a clean dashboard, and an extension that is useful without getting in the way.",
    skills: [
      "React 19",
      "Next.js 16",
      "TypeScript",
      "Node.js",
      "Anthropic",
      "DeepSeek",
      "Llama",
      "Chrome Extension",
    ],
  },
  {
    id: "vynspire-2025",
    company: {
      name: "Vynspire AI Labs",
      duration: "Aug 2025 — Nov 2025",
      role: "Software Engineer",
      url: "https://www.vynspirelabs.ai",
    },
    contribute: [
      "Integrated Stripe and PayPal into the hotel booking checkout for a secure payment flow.",
      "Built the hotel booking platform with Next.js, TypeScript, and FastAPI.",
      "Managed AWS Amplify environments so development, staging, and production stayed separate.",
    ],
    description:
      "At Vynspire AI Labs I worked on a hotel booking platform. I integrated Stripe and PayPal for checkout, and built the product with Next.js and TypeScript on the frontend and FastAPI on the services.\n\nI also managed AWS Amplify environments so testing and deployment stayed smooth across development, staging, and production.",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "React",
      "Stripe",
      "PayPal",
      "AWS Amplify",
    ],
  },
  {
    id: "fatdog-2024",
    company: {
      name: "Fatdog Technology Pvt.",
      duration: "Aug 2024 — Mar 2025",
      role: "Frontend Developer",
      url: "https://fatdoglabs.com",
    },
    contribute: [
      "Built healthcare modules and dynamic forms for different diseases.",
      "Worked on the e-commerce portal for both customers and admins, including PHP Laravel.",
      "Deployed the work with Docker on DigitalOcean.",
    ],
    description:
      "At Fatdog Technology I built healthcare modules and forms that could support different diseases. I also worked on an e-commerce portal from both sides, the customer storefront and the admin tools, using PHP Laravel where needed.\n\nReleases were packaged with Docker and deployed on DigitalOcean.",
    skills: [
      "PHP",
      "Laravel",
      "Docker",
      "DigitalOcean",
      "Next.js",
      "Vue.js",
      "React",
    ],
  },
  {
    id: "logica-2024",
    company: {
      name: "LogicaBeans Pvt. Ltd.",
      duration: "Oct 2021 — Jul 2024",
      role: "Software Engineer",
      url: "https://logicabeans.com",
    },
    contribute: [
      "Worked as an offshore engineer on a US healthcare portal with an international team.",
      "Delivered multi-tenant features using Okta, GraphQL with Apollo Client, Liquibase, and Entity Framework on the services.",
      "Built a dedicated module for dynamic forms and PDFs.",
      "Developed new modules and features based on client requirements.",
      "Wrote complete documentation for deploying the codebase on GCP.",
    ],
    description:
      "At LogicaBeans I worked across different domains and projects. As an offshore engineer on a US healthcare portal I collaborated with an international team on multi-tenant systems, Okta, GraphQL with Apollo Client, Liquibase, and Entity Framework on the services. I built new modules and features for client requirements, including a separate module for dynamic forms and PDFs.\n\nAlongside core delivery I supported a Singapore client part-time, and I wrote the full documentation for deploying the code on GCP.",
    domains: [
      "Healthcare Portal, Multitenant",
      "Hospitality",
      "Time Management",
      "Financial Management",
      "Date Booking",
    ],
    subsection: {
      title: "Singapore client, part-time",
      description:
        "Alongside core delivery I maintained production modules for a Singapore-based client using PhpRunner, including feature updates, fixes, and ongoing operational support. I also wrote complete GCP deployment documentation so releases were documented end to end.",
    },
    skills: [
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Okta",
      "Liquibase",
      "Entity Framework",
      ".NET Core",
      "GCP",
      "T-SQL",
      "PHP",
    ],
  },
  {
    id: "influence-2021",
    company: {
      name: "Influence | Target Solutions India",
      duration: "Jul 2021 — Sep 2021",
      role: "Software Engineer Trainee",
    },
    contribute: [
      "Worked on a task management system using React, Node.js, and MongoDB.",
      "Tested the software and fixed bugs before release.",
      "Built user interfaces and pages based on the requirements.",
    ],
    description:
      "As a Software Engineer Trainee I worked on a task management system using React, Node.js, and MongoDB. I tested the software, fixed bugs, and built user interfaces and pages from the given requirements.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
  },
];

export function getExperienceById(id: string): WorkExperience | undefined {
  const slug = id.trim().toLowerCase();
  return workExperience.find((item) => item.id === slug);
}

export type EducationTerm = {
  title: string;
  modules: string[];
};

export type EducationItem = {
  id: string;
  school: {
    name: string;
    duration: string;
    program: string;
    affiliation?: string;
    location?: string;
    url?: string;
  };
  degreeType: string;
  skills: string[];
  description: string;
  terms?: EducationTerm[];
  extraModules?: string[];
  note?: string;
};

export const education: EducationItem[] = [
  {
    id: "msc-2026",
    school: {
      name: "BPP University",
      duration: "2026 — Present",
      program: "MSc Management with Data Analytics",
      location: "1 Portsoken St, London E1 8BT",
      url: "https://www.bpp.com/about-bpp",
    },
    degreeType: "Master's Program",
    skills: [
      "Customer Experience",
      "Principles of Management",
      "Digital Change",
      "Cloud Computing",
      "Consultancy",
      "Strategy & Sustainability",
      "Programming",
      "Data Modelling",
      "AI",
    ],
    description:
      "MSc Management with Data Analytics at BPP University combines management practice with applied data and AI. The year is taught in three terms — from customer experience and the principles of management, through emerging technology and strategy, to programming, data modelling, and AI.",
    terms: [
      {
        title: "First term",
        modules: [
          "Managing Customer Experience",
          "Principles of Management (planning, controlling, managing, organising)",
          "Leading through Digital Change",
        ],
      },
      {
        title: "Second term",
        modules: [
          "Emerging Technology and Cloud Computing",
          "Consultancy Project Proposal",
          "Organisational Strategy and Sustainability",
        ],
      },
      {
        title: "Third term",
        modules: ["Programming, Data Modelling and AI"],
      },
    ],
  },
  {
    id: "cse-2021",
    school: {
      name: "IK Gujral Punjab Technical University",
      duration: "2017 — 2021",
      program: "B.Tech in Computer Science Engineering",
      affiliation: "Punjab Technical University affiliated",
      location: "Kapurthala, Punjab, India",
      url: "https://ptu.ac.in",
    },
    degreeType: "Bachelor's Program",
    skills: [
      "C++",
      "Java",
      "JavaScript",
      "Python",
      "Algorithms",
      "RDBMS",
      "Networking",
      "SDLC",
      "OOP",
      "HAINA",
      "Data Structures",
      "Big Data",
      "AI",
      "Cloud Computing",
      "Digital Circuits",
      "Assembly",
    ],
    description:
      "An advanced engineering course covering how software is designed, built, and run — from algorithms and programming languages through databases, networks, and the software development life cycle. I also took part in hackathons and programmes organised by the university.",
    extraModules: [
      "Designing and Implementation of Algorithms",
      "C++",
      "Java",
      "JavaScript",
      "Python",
      "Relational Database Management Systems",
      "Networking",
      "Software Development Life Cycle",
      "Object-Oriented Programming",
      "Functional Programming",
      "HAINA Networking",
      "Certified HAINA",
      "Data Structures",
      "Big Data Analytics",
      "Artificial Intelligence",
      "Cloud Computing",
      "Digital Circuits",
      "Computer Organization and Assembly Language",
    ],
  },
];

export function getEducationById(id: string): EducationItem | undefined {
  const slug = id.trim().toLowerCase();
  return education.find((item) => item.id === slug);
}
