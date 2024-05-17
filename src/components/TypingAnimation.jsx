import{useState, useEffect } from "react";

const TypingAnimation = ( text ) => {
  const [displayedText, setDisplayedText] = useState("");
  const  speed = 200

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.toString().charAt(index));
      index++;
      if (index >= text.toString().length) {
        clearInterval(intervalId);
      }
    }, speed);
  
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return JSON.stringify(displayedText);
};

export default TypingAnimation;
