import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import Testing from "./pages/Testing.jsx";
import StartAnalysis from "./pages/StartAnalysis.jsx";
import Select from "./pages/Select.jsx";
import Summary from "./pages/Summary.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/start-analysis" element={<StartAnalysis />} />
        <Route path="/select" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}
