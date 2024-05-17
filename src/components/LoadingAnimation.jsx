const LoadingAnimation = () => {
  // Define the number of times to render the div
  const numDivs = 4;

  const divs = Array.from({ length: numDivs }, (_, index) => (
    <div key={index} className="w-full h-1 mt-2 bg-gradient-to-r rounded-lg from-zinc-400 to-gray-600 animate-pulse"></div>
  ));

  return (
    <div className="flex w-full flex-col">
      {divs}
    </div>
  );
};

export default LoadingAnimation;
