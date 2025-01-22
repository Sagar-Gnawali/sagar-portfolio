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
