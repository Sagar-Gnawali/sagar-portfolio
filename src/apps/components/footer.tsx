import { getDayName } from "../../utils";
export default function Footer() {
  return (
    <footer
      className={`flex justify-center gap-1 text-cente bg-gray-800 bottom-0 text-white text-center py-4 mt-auto w-full`}
    >
      <p> Rights reserved © {new Date().getFullYear()}. </p>
      <p className="bg-gradient-to-r from-blue-300 via-orange-300 to-red-300 inline-block text-transparent bg-clip-text">
        {""}Have a good {getDayName(new Date().getDay())}!
      </p>
    </footer>
  );
}
