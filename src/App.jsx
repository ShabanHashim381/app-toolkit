import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Homepage from "./pages/Homepage";
import Application from "./pages/Application";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/application" element={<Application />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
