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
    <Container className="flex justify-center items-center min-h-screen">
      <div className="flex items-center justify-center text-center">
        <div className="w-full">
          <div className="profile-ring my-6">
            <img src={Profile} alt="Sagar Gnawali" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              Software
            </span>{" "}
            Engineer, passionate
            <br />
            about{" "}
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 inline-block text-transparent bg-clip-text leading-snug">
              photography
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-sky-300 via-orange-300 to-rose-300 inline-block text-transparent bg-clip-text">
              books.
            </span>
          </h1>
          <div className="w-full mt-6 mb-8">
            <SocialLink SocialData={socialLinks} />
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigation("/about")}
              className="btn btn-primary"
            >
              About me
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="btn btn-ghost"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
