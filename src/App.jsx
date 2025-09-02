import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Nav from "./components/Nav.jsx";
import Landing from './pages/Landing'
import Testing from "./pages/Testing.jsx";
import StartAnalysis from "./pages/StartAnalysis.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/start-analysis" element={<StartAnalysis />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    )
}
