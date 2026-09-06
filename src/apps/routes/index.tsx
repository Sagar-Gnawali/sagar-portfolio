import { Routes, Route } from "react-router-dom";
import Work from "@pages/work/Work";
import WorkDetail from "@pages/work/WorkDetail";
import Skills from "@pages/skills/Skills";
import Education from "@pages/education/Education";
import EducationDetail from "@pages/education/EducationDetail";
import Hobbies from "@pages/hobbies/Hobbies";
import Home from "@pages/home/Home";
import About from "@pages/about/About";

export default function NavRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<WorkDetail />} />
      <Route path="/experience/:slug" element={<WorkDetail />} />
      <Route path="/education" element={<Education />} />
      <Route path="/education/:slug" element={<EducationDetail />} />
      <Route path="/hobbies" element={<Hobbies />} />
    </Routes>
  );
}
