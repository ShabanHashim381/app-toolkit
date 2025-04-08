import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { SiHomepage } from "react-icons/si";
import { FiGrid } from "react-icons/fi";

const SidebarItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 cursor-pointer transition text-white">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {!isOpen && (
        <div className="w-16 bg-gray-900 h-screen flex items-start p-4">
          <RiMenu3Line
            size={24}
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}

      {isOpen && (
        <div className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">App-Toolkit</h2>
            <RiCloseLine
              size={20}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex-1 space-y-4">
            <SidebarItem
              icon={<SiHomepage size={18} />}
              label="Homepage"
              to="/"
            />
            <SidebarItem
              icon={<FiGrid size={18} />}
              label="Application"
              to="/application"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
