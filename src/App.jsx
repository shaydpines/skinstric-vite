import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import Testing from "./pages/Testing.jsx";
import Page2 from './pages/Page2'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Testing" element={<Testing />} />
                <Route path="/002" element={<Page2 />} />
            </Routes>
        </Router>
    )
}
