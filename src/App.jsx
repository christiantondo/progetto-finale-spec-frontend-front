import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Homepage from './pages/Homepage';
import VehicleList from './pages/VehicleList';
import UserFavorite from './pages/UserFavorite';
import { GlobalProvider } from './context/GlobalContext';

function App() {

    return (
        <GlobalProvider>

            <BrowserRouter>

                <nav>
                    <NavLink to="/">LSV</NavLink>
                    <NavLink to="/vehicles">Our Vehicles</NavLink>
                    <NavLink to="/userfavorite">Your favorites</NavLink>
                </nav>

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/vehicles" element={<VehicleList />} />
                    <Route path="/userfavorite" element={<UserFavorite />} />
                </Routes>

            </BrowserRouter>

        </GlobalProvider>
    )
}

export default App
