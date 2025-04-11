import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg')",
      }}
    >
      <nav className="container mx-auto py-4 flex items-center justify-between backdrop-brightness-90">
        <div className="text-2xl font-bold text-white space-x-2">
          App <span className="text-blue-400 underline">Toolkit.</span>
        </div>
        <div className="flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-200 transition-colors">
            About
          </Link>
          <Link to="/footer" className="hover:text-blue-200 transition-colors">
            Footer
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
