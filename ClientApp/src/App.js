import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Employees, Profile, AddEmployee } from 'pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/view-employees' element={<Employees />} />
                    <Route path='/insert-employee' element={<AddEmployee />} />
                    <Route path='/profile/:id' element={<Profile />} />
                </Routes>
            </Router>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
