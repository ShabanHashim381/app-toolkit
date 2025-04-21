import { Link, useNavigate } from "react-router-dom";

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

  return (
    <div className=" bg-gray-500 text-gray-900 p-8 mt-35">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">
          🧰 App <span className="text-blue-400">-</span>
          <span className="text-blue-400"> Toolkit.</span>
        </h1>
        <p className="text-lg text-gray-300">
          A collection of totally necessary apps you didn’t know you needed.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => {
          return (
            <div
              key={tool.title}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{tool.title}</h2>
                <p className="text-gray-500 mb-4">{tool.description}</p>
              </div>
              <button
                onClick={() => navigate(tool.route)}
                className="mt-auto inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Open
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Application;
