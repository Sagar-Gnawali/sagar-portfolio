import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Work from "../pages/work/Work";
import Education from "../pages/education/Education";
import Hobbies from "../pages/hobbies/Hobbies";
import Skills from "../pages/skills/Skills";
export default function NavRouter() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/work" element={<Work />} />
        <Route path="/education" element={<Education />} />
        <Route path="/hobbies" element={<Hobbies />} />
      </Routes>
  );
}
