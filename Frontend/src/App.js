import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCanteen from "./pages/auth/LoginCanteen";
import LoginStudent from "./pages/auth/LoginStudent"
import Register from "./pages/auth/Register";
import AdditionalRoutes from "./AdditionalRoutes";
import LandingPage from "./pages/components/LandingPage";
import { useState } from "react";

function App() {
  const [isloggedIn, setIsLoggedIN] = useState(false);
  const loginhandle = (data) =>{
    console.log("Hii from app")
    setIsLoggedIN(data);
  }
  return (
    <>
      {!isloggedIn && (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login-canteen" element={<LoginCanteen loginHandle={loginhandle}/>} />
            <Route path="/login-student" element={<LoginStudent loginHandle={loginhandle}/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
       )} 
      
      {isloggedIn && <AdditionalRoutes />}
    </>
  );
}

export default App;
