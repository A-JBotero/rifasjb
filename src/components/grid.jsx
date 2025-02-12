const Grid = () => {
  // Generates the grid that contains the list of numbers from 00 to 99
  const numbers = Array.from({ length: 100 }, (_, index) => index.toString().padStart(2, '0'));

  return (
    <div className="flex justify-center items-center bg-darkgray">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 border border-gray-300">
        {numbers.map((number) => (
          <button
            key={number}
            className="flex justify-center items-center w-12 h-12 md:w-16 md:h-16 border border-gray-200 bg-white text-sm md:text-lg font-bold text-gray-700 hover:bg-gray-200 focus:outline-none"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Grid;
