import { useState, useEffect } from "react";

type TypeWriterProps = {
  text: string;
  speed: number;
};

export default function TypewriterEffect({
  text = "",
  speed = 100,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
