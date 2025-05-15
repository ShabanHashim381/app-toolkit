import { FiSearch } from "react-icons/fi";

const TodoNavbar = ({ setSearchText, isSidebarOpen }) => {
  return (
    <nav className="bg-sky-600 w-full h-11">
      <div
        className={`${
          isSidebarOpen ? "max-w-3xl" : "w-full"
        } mx-auto h-full flex items-center justify-between px-4`}
      >
        <p className="text-white text-2xl mt-3">To Do</p>

        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-2/3 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-md" />
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-8 pl-10 pr-4 rounded-md border border-white bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TodoNavbar;
