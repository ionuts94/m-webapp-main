import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Employees, Profile } from 'pages';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/view-employees' element={<Employees />} />
                <Route path='/profile/:id' element={<Profile />} />
            </Routes>
        </Router>
    );
}
