import React, { useContext } from "react";
import { CounterContext } from "../../context/CounterContext";

const CounterApp = () => {
  const { count, increment, decrement, reset } = useContext(CounterContext);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      <div className="text-5xl font-semibold mb-4">{count}</div>
      <div className="space-x-4">
        <button
          onClick={increment}
          className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterApp;
