import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
