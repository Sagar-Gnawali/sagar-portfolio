import Container from "../../components/container";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigation = useNavigate();
  const handleDownload = () => {
    const resumeUrl = "/public/sagar-gnawali.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Sagar Gnawali.pdf";
    link.click();
  };
  return (
    <Container className="">
      <div className="flex my-5 tems-center self-center m-auto justify-center text-center ">
        <div>
          <div className="text-5xl font-normal leading-tight">
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 inline-block text-transparent bg-clip-text">
              {" "}
              Software
            </span>{" "}
            developer, passionate
            <br />
            <span>
              about{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 inline-block text-transparent bg-clip-text">
                photography
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-blue-300 via-orange-300 to-red-300 inline-block text-transparent bg-clip-text">
                books.
              </span>
            </span>
          </div>
          <div className="mt-10 flex justify-center gap-5">
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
