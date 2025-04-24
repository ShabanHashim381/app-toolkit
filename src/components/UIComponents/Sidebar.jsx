import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { SiHomepage } from "react-icons/si";
import { FiGrid } from "react-icons/fi";

const SidebarItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200 text-gray-300">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className=" bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?t=st=1744318180~exp=1744321780~hmac=2e6544710b3b7966b8cd95f4d226ab51895726d56f7c0cce1ad2f83ed3ac93fe&w=996')",
        height: "100vh",
      }}
    >
      {isOpen ? (
        <div className="w-64 border-y-indigo-300 text-white h-full flex flex-col justify-between p-6 shadow-xl transition-all duration-300">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-wide">
                App<span className="text-blue-500">Toolkit</span>
              </h2>
              <RiCloseLine
                size={22}
                className="cursor-pointer hover:text-red-400 transition-colors"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Menu Items */}
            <nav className="space-y-3">
              <SidebarItem
                icon={<SiHomepage size={20} />}
                label="Homepage"
                to="/"
              />
              <SidebarItem
                icon={<FiGrid size={20} />}
                label="Application"
                to="/application"
              />
            </nav>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-300 text-center mt-8">
            © 2025 AppToolkit
          </div>
        </div>
      ) : (
        <div className="w-16 bg-gray-900/80 h-full flex items-start justify-center p-4 shadow-lg">
          <RiMenu3Line
            size={26}
            className="text-white cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
