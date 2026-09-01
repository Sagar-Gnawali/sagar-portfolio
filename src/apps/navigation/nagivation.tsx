import { NavLink, useLocation } from "react-router-dom";
import MonitorSvg from "@assets/icons";
import GreaterThan from "@assets/icons/greater";
import HomeIcon from "@assets/icons/home";
import FileIcon from "@assets/icons/file";
import TypewriterEffect from "@components/type-writer";
import ThemeToggle from "@components/theme-toggle";

const links = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/skills", label: "Skills" },
];

export default function Navigation() {
  const location = useLocation();
  const terminal = location.pathname.split("/")[1] || "home";

  return (
    <nav className="nav-glass glass" aria-label="Primary">
      <NavLink to="/" className="terminal-chip" end>
        <MonitorSvg />
        <GreaterThan />
        {terminal === "home" ? <HomeIcon /> : <FileIcon />}
        <span className="terminal-path">
          <TypewriterEffect text={`~/${terminal}`} speed={50} />
          <span className="blink ml-1">|</span>
        </span>
      </NavLink>

      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link${isActive ? " is-active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
