import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { SiHomepage } from "react-icons/si";
import { FiGrid } from "react-icons/fi";

const SidebarItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 hover:text-cyan-300 transition-colors duration-200 text-slate-200 drop-shadow-sm">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/gradient-border-black-background_53876-118402.jpg?t=st=1746033268~exp=1746036868~hmac=b7dcb1934b522eb4b0317b906b570408058b4b627f7a179e5f86a41b541f5098&w=740')",
        height: "100vh",
      }}
    >
      {isOpen ? (
        <div className="w-64 text-white h-full flex flex-col justify-between p-6 bg-black/40 backdrop-blur-sm transition-all duration-300">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-wide text-cyan-300 drop-shadow-sm">
                App<span className="text-blue-400">Toolkit</span>
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
          <div className="text-xs text-slate-400 text-center mt-8 drop-shadow-sm">
            © 2025 AppToolkit
          </div>
        </div>
      ) : (
        <div className="w-16 bg-black/60 backdrop-blur-sm h-full flex items-start justify-center p-4 shadow-lg">
          <RiMenu3Line
            size={26}
            className="text-white cursor-pointer hover:text-cyan-300 transition-colors"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
