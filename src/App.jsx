import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import Testing from "./pages/Testing.jsx";
import StartAnalysis from "./pages/StartAnalysis.jsx";
import Nav from "./components/Nav.jsx";

export default function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/start-analysis" element={<StartAnalysis />} />
            </Routes>
        </Router>
    )
}
