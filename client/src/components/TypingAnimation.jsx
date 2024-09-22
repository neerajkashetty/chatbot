import { useState, useEffect } from "react";

const TypingAnimation = ( {text} ) => {
    const string = JSON.stringify(text);
    console.log(string)

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

  return displayedText;
};

export default TypingAnimation;
