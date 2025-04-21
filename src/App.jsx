import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Application from "./pages/Application";
import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/Layouts/Nabar";

import { TodoProvider } from "./context/TodoContext";
import { CounterProvider } from "./context/CounterContext";
import { EcommerceProvider } from "./context/EcommerceContext";

import TodoApp from "./TodoApp";
import CounterApp from "./components/Counter/CounterApp";
import About from "./components/Layouts/About";
import Footer from "./components/layouts/Footer";
import EcommerceApp from "./components/Ecommerce/EcommerceApp";

const App = () => {
  return (
    <div className="h-full w-full">
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
};

export default App;
