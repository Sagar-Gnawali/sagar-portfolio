import Container from "../../components/container";
import GridContainer from "../../components/grid-container";
import { EducationTimeLine } from "../../components/education-timeline";
import {
  dataBase,
  otherTools,
  skills,
  versionControl,
} from "../../constants/content";

export default function About() {
  return (
    <Container className="">
      <div>
        <div className="mb-5">
          <p className="text-3xl leading-1  ">Hi, I'm Sagar Gnawali</p>
          <span className="font-light text-gray-600">
            a Software Developer trying to make the world a bit more functional.
          </span>
          🇳🇵
        </div>
        <p className="leading-1">
          Highly motivated and results-driven software developer with 3.5 years
          of experience in the software development lifecycle. Eager to leverage
          technical expertise, creativity, and a passion for continuous learning
          to contribute effectively and make a meaningful impact in a
          challenging role.
        </p>
        <p className="leading-1 mt-2">
          In my free time, I enjoy reading books. These interests allow me to
          decompress and clear my mind, so I can come back to coding with a
          fresh perspective.
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
        <p className="font-semibold  mt-4 capitalize">DataBase</p>
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
