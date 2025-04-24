import React, { useContext } from "react";
import { CounterContext } from "../../context/CounterContext";

const Counter = () => {
  const { count, increment, decrement, reset } = useContext(CounterContext);

  return (
    <div className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6">Counter</h2>
      <div className="text-6xl font-semibold text-white mb-6">{count}</div>
      <div className="flex justify-center gap-6">
        {" "}
        {/* Added gap-6 to create space between buttons */}
        <button
          onClick={increment}
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-8 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition-all duration-300"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-8 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 transition-all duration-300"
        >
          -
        </button>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-8 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-700 transition-all duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
