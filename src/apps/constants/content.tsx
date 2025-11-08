import { FaReact, FaSass, FaTrello } from "react-icons/fa";
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
} from "react-icons/si";

import { ImHtmlFive2 } from "react-icons/im";
import { RiJavascriptLine } from "react-icons/ri";
import { BsFiletypeSql } from "react-icons/bs";
import { FiGitlab } from "react-icons/fi";
import { BiLogoGraphql } from "react-icons/bi";

import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
export const dataBase = [
  {
    name: "MySql",
    icon: <SiMysql size={25} />,
  },
  {
    name: "Transact-SQL",
    icon: <BsFiletypeSql size={20} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={20} />,
  },
];
export const skills = [
  {
    name: "React JS",
    icon: <FaReact size={20} />,
  },
  {
    name: "Next JS",
    icon: <TbBrandNextjs size={20} />,
  },
  {
    name: "JavaScript",
    icon: <RiJavascriptLine size={23} />,
  },
  {
    name: "HTML, CSS",
    icon: <ImHtmlFive2 size={20} />,
  },
  {
    name: "SASS",
    icon: <FaSass size={22} />,
  },
  {
    name: "TypeScript",
    icon: <TbBrandTypescript size={20} />,
  },
  {
    name: "GraphQL",
    icon: <BiLogoGraphql size={20} />,
  },
  {
    name: "Tailwind CSS",
    icon: <TbBrandTailwind size={22} />,
  },
];

export const versionControl = [
  {
    name: "Git",
    icon: <FaGitAlt size={20} />,
  },
  {
    name: "GitHub",
    icon: <LiaGithubSquare size={25} />,
  },
  {
    name: "GitLab",
    icon: <FiGitlab size={25} />,
  },
  {
    name: "BitBucket",
    icon: <TbBrandBitbucket size={20} />,
  },
];
export const otherTools = [
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
    icon: <SiZoho size={25} />,
  },
  {
    name: "Docker",
    icon: <LiaDocker size={25} />,
  },
  {
    name: "Source Tree",
    icon: <LiaSourcetree size={25} />,
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
