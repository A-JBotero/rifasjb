const Grid = () => {
  // Genera una lista de números del 0 al 99
  const numbers = Array.from({ length: 100 }, (_, index) => index);

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary">
      <div className="grid grid-cols-10 grid-rows-10 gap-0 border border-gray-300">
        {numbers.map((number) => (
          <button
            key={number}
            className="flex justify-center items-center w-16 h-16 border border-gray-200 bg-white text-lg font-bold text-gray-700 hover:bg-gray-200 focus:outline-none"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Grid;