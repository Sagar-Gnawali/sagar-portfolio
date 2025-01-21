export const getDayName = (d: number): string => {
  const day = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  //@ts-ignore
  return day[d];
};
export default function Footer() {
  return (
    <footer className="flex justify-center gap-1 text-cente bg-gray-800 absolute text-white text-center py-4 mt-auto bottom-0 w-full">
      <p> Rights reserved © {new Date().getFullYear()}. </p>
      <p className="bg-gradient-to-r from-blue-300 via-orange-300 to-red-300 inline-block text-transparent bg-clip-text">
        {""}Have a good {getDayName(new Date().getDay())}!
      </p>
    </footer>
  );
}
