import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCanteen from "./pages/auth/LoginCanteen";
import LoginStudent from "./pages/auth/LoginStudent"
import Register from "./pages/auth/Register";
import AdditionalRoutes from "./AdditionalRoutes";
import LandingPage from "./pages/components/LandingPage";

function App() {
  const isloggedIn = false;
  return (
    <>
      {!isloggedIn && (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login-canteen" element={<LoginCanteen />} />
            <Route path="/login-student" element={<LoginStudent />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      )}

      {isloggedIn && <AdditionalRoutes />}
    </>
  );
}

export default App;
