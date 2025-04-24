import React from "react";
import Navbar from "./Navbar";
import { Sidebar } from "lucide-react";
import Footer from "./components/layouts/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-amber-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
