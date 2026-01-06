import Container from "@components/container";
import GridContainer from "@components/grid-container";
import { EducationTimeLine } from "@components/education-timeline";
import {
  dataBase,
  otherTools,
  skills,
  versionControl,
} from "@constants/content";

export default function About() {
  return (
    <Container>
      <div>
        <div className="mb-5">
          <p className="text-3xl leading-1  ">Hi, I'm Sagar Gnawali</p>
          <span className="font-light text-gray-600">
            a Software Engineer trying to make the world a bit more functional.
          </span>
          🇳🇵
        </div>
        <p className="leading-1">
          It&prime;s been 4 years of making computers do what I want. Sometimes
          they listen, sometimes they don't... but we always figure it out.
        </p>
        <p className="leading-1 mt-2">
          Outside of convincing computers to work, I read books , go trekking,
          and take photos. Check out my{" "}
          <a
            className="text-blue-600"
            href="https://www.pexels.com/@sagar-gnawali-1389137/"
            target="_blank"
          >
            pexels profile
          </a>{" "}
          if you want to see what I do when I&prime;m not debugging.
        </p>
      </div>
      {/* Skills Section */}
      <div>
        <p className="font-semibold  mt-10 capitalize">Skills</p>
        <div className="px-1">
          <GridContainer GridData={skills} />
        </div>
      </div>

      {/* Version Control*/}
      <div>
        <p className="font-semibold  mt-4 capitalize">Version Control</p>
        <div className="px-1">
          <GridContainer GridData={versionControl} />
        </div>
      </div>

      {/* DataBase */}
      <div>
        <p className="font-semibold  mt-4 capitalize">Database</p>
        <div className="px-1">
          <GridContainer GridData={dataBase} />
        </div>
      </div>
      {/* Other Tools */}
      <div>
        <p className="font-semibold  mt-4 capitalize">Tools</p>
        <div className="px-1">
          <GridContainer GridData={otherTools} />
        </div>
      </div>
      <div className="mt-5">
        <EducationTimeLine />
      </div>
    </Container>
  );
}
