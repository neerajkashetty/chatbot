const TypingAnimation = () => {
  // Define the number of times to render the div
  const numDivs = 4;

  // Create an array of length numDivs and map over it to generate the JSX elements
  const divs = Array.from({ length: numDivs }, (_, index) => (
    <div key={index} className="w-full h-1 mt-2 bg-gradient-to-r rounded-lg from-zinc-400 to-gray-600 animate-pulse"></div>
  ));

  // Render the array of divs
  return (
    <div className="flex w-full flex-col">
      {divs}
    </div>
  );
};

export default TypingAnimation;
