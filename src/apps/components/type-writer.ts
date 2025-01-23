import { useState, useEffect } from "react";
type TypeWriterProps = {
  text: string;
  speed: number;
};
export default function TypewriterEffect({
  text = "",
  speed = 100,
}: TypeWriterProps): string {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => {
          return prev + text.charAt(index);
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
      setDisplayedText("");
    };
  }, [text, speed]);
  return displayedText;
}
