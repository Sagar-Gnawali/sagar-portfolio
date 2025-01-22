import { NavLink, useLocation } from "react-router-dom";

import MonitorSvg from "../../assets/icons";
import GreaterThan from "../../assets/icons/greater";
import HomeIcon from "../../assets/icons/home";
import FileIcon from "../../assets/icons/file";
import TypewriterEffect from "../components/type-writer";

export default function Navigation() {
  const location = useLocation();
  let terminal = location.pathname.split("/")[1];
  const navigationBottom = "border-b-2 rounded-sm border-indigo-500";
  return (
    <nav className="flex justify-center gap-4 p-4 border border-b-3 ">
      <NavLink
        to="/"
        className="h-6 transform transition-transform duration-300 hover:scale-110"
        end
      >
        <div className="flex justify-center gap-1">
          <span className="">
            <MonitorSvg />
          </span>
          <span>
            <GreaterThan />
          </span>
          <span className="mr-1">{terminal ? <FileIcon /> : <HomeIcon />}</span>
          <p className="w-[100px] font-semibold">
            {TypewriterEffect({ text: ` ~/${terminal}`, speed: 50 })}
            <span className="blink ml-1">|</span>
          </p>{" "}
        </div>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? navigationBottom : "")}
        to="/about"
        end
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? navigationBottom : "")}
        to="/work"
      >
        Work
      </NavLink>
    </nav>
  );
}
