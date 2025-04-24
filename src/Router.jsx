import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Application from "./pages/Application";
import Sidebar from "./components/UIComponents/Sidebar";
import Navbar from "./components/UIComponents/Nabar";

import { TodoProvider } from "./context/TodoContext";
import { CounterProvider } from "./context/CounterContext";
import { EcommerceProvider } from "./context/EcommerceContext";

import CounterApp from "./pages/CounterApp";
import Footer from "./components/UIComponents/Footer";
import About from "./pages/About";
import EcommerceApp from "./pages/EcommerceApp";
import TodoApp from "./pages/TodoApp";

function Routers() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/application" element={<Application />} />
              <Route
                path="/todo"
                element={
                  <TodoProvider>
                    <TodoApp />
                  </TodoProvider>
                }
              />
              <Route
                path="/counter"
                element={
                  <CounterProvider>
                    <CounterApp />
                  </CounterProvider>
                }
              />
              <Route
                path="/shop"
                element={
                  <EcommerceProvider>
                    <EcommerceApp />
                  </EcommerceProvider>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default Routers;
