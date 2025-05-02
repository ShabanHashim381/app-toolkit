import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/common/SearchInput";

const tools = [
  {
    title: "Todo List",
    description: "Plan your day, or pretend you’re going to.",
    route: "/todo",
  },
  {
    title: "Counter",
    description: "Increment things until it feels productive.",
    route: "/counter",
  },
  {
    title: "Ecommerce",
    description: "Because building fake stores is cheaper than shopping.",
    route: "/shop",
  },
];

const Application = () => {
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/dark-geometric-background-with-copy-space_24972-1816.jpg?semt=ais_hybrid&w=740')`,
      }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-indigo-300">
            🧰 App <span className="text-blue-400">-</span>
            <span className="text-purple-400"> Toolkit.</span>
          </h1>
          <p className="text-lg text-gray-300">
            A collection of totally necessary apps you didn’t know you needed.
          </p>
        </header>

        <div className="max-w-md mx-auto mb-10">
          <SearchInput
            value={productSearch}
            onChange={setProductSearch}
            placeholder="Search tools..."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredTools.map((tool) => (
            <div
              key={tool.title}
              className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:bg-opacity-20 transition"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {tool.title}
                </h2>
                <p className="text-gray-300 mb-4">{tool.description}</p>
              </div>
              <button
                onClick={() => navigate(tool.route)}
                className="mt-auto inline-block text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Application;
