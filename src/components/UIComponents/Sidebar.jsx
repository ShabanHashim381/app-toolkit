import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { SiHomepage } from "react-icons/si";
import { FiGrid } from "react-icons/fi";

const SidebarItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 hover:text-cyan-300 transition-colors duration-200 text-slate-200 drop-shadow-sm">
      {icon}
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  </Link>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div
      className="bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-background-design-black_53876-43543.jpg?t=st=1746118192~exp=1746121792~hmac=ba5e7dd7c915271c956e65be8675098ee09319990b9cb83e05ea15da4e1325e8&w=996')",
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
        <div className="w-16 bg-black/60 backdrop-blur-sm h-full flex flex-col items-center p-4 shadow-lg space-y-6">
          <RiMenu3Line
            size={26}
            className="text-white cursor-pointer hover:text-cyan-300 transition-colors"
            onClick={() => setIsOpen(true)}
          />

          <div className="flex flex-col items-center space-y-6 mt-6">
            <SidebarItem icon={<SiHomepage size={20} />} label="" to="/" />
            <SidebarItem
              icon={<FiGrid size={20} />}
              label=""
              to="/application"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
