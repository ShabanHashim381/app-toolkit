import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-background-design-black_53876-43543.jpg?t=st=1746118192~exp=1746121792~hmac=ba5e7dd7c915271c956e65be8675098ee09319990b9cb83e05ea15da4e1325e8&w=996')",
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
