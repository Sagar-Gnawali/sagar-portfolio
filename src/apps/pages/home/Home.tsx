import { useNavigate } from "react-router-dom";
import Profile from "@assets/profile.jpg";
import Container from "@components/container";
import { SocialLink } from "@components/social-links";
import { socialLinks } from "@constants/content";

export default function Home() {
  const navigation = useNavigate();
  const handleDownload = () => {
    const resumeUrl = "/sagar-gnawali.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Sagar Gnawali.pdf";
    link.click();
  };
  return (
    <Container>
      <div className="flex my-5 items-center self-center m-auto justify-center text-center ">
        <div>
          <div className="w-full flex justify-center items-center my-4">
            <img
              src={Profile}
              alt="Profile-picture"
              className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] object-cover object-center  rounded-full border-4 border-blue-400"
            />
          </div>
          <div className="text-4xl sm:text-5xl font-normal leading-tight">
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 inline-block text-transparent bg-clip-text">
              {" "}
              Software
            </span>{" "}
            developer, passionate
            <br />
            <span>
              about{" "}
              <span className="bg-gradient-to-r leading-normal from-orange-300 via-orange-400 to-orange-500 inline-block text-transparent bg-clip-text">
                photography
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-blue-300 via-orange-300 to-red-300 inline-block text-transparent bg-clip-text">
                books.
              </span>
            </span>
          </div>
          <div className="w-full mt-2">
            <SocialLink SocialData={socialLinks} />
          </div>
          <div className="mt-5 flex justify-center gap-5">
            <button
              onClick={() => {
                navigation("/about");
              }}
              className="px-4 py-2 capitalize bg-gray-500 text-white  rounded-lg  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              About me
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-white text-black border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-opacity-75"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
