import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import Testing from "./pages/Testing.jsx";
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'
import Page9 from './pages/Page9'
import Page10 from './pages/Page10'
import Page11 from './pages/Page11'
import Page12 from './pages/Page12'
import Page13 from './pages/Page13'
import Page14 from './pages/Page14'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Testing" element={<Testing />} />
                <Route path="/002" element={<Page2 />} />
                <Route path="/003" element={<Page3 />} />
                <Route path="/004" element={<Page4 />} />
                <Route path="/005" element={<Page5 />} />
                <Route path="/006" element={<Page6 />} />
                <Route path="/007" element={<Page7 />} />
                <Route path="/008" element={<Page8 />} />
                <Route path="/009" element={<Page9 />} />
                <Route path="/010" element={<Page10 />} />
                <Route path="/011" element={<Page11 />} />
                <Route path="/012" element={<Page12 />} />
                <Route path="/013" element={<Page13 />} />
                <Route path="/014" element={<Page14 />} />
            </Routes>
        </Router>
    )
}
