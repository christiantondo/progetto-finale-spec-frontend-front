import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Homepage from './pages/Homepage';
import VehicleList from './pages/VehicleList';
import UserFavorite from './pages/UserFavorite';
import { GlobalProvider } from './context/GlobalContext';
import { DetailPage } from './pages/DetailPage';

function App() {

    return (
        <GlobalProvider>

            <BrowserRouter>

                <div>
                    <nav className='navbar'>
                        <NavLink to="/">LSV</NavLink>
                        <NavLink to="/vehicles">Our Vehicles</NavLink>
                        <NavLink to="/userfavorite">Your favorites</NavLink>
                    </nav>

                    <div className='container-boxed'>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/vehicles" element={<VehicleList />} />
                            <Route path="/userfavorite" element={<UserFavorite />} />
                            <Route path="/vehicles/:id" element={<DetailPage />} />
                        </Routes>
                    </div>
                </div>

            </BrowserRouter>

        </GlobalProvider>
    )
}

export default App
