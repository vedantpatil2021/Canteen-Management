import React, { createContext } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCanteen from "./pages/auth/LoginCanteen";
import LoginStudent from "./pages/auth/LoginStudent"
import Register from "./pages/auth/Register";
import AdditionalRoutes from "./AdditionalRoutes";
import { CartProvider } from "react-use-cart";
import LandingPage from "./pages/components/LandingPage";
import { useState } from "react";

export const RoleContext = createContext();
function App() {
  const [isloggedIn, setIsLoggedIN] = useState(false);
  const [isSTUloggedIn, setIsSTULoggedIN] = useState(false);
  const [role, setRole] = useState("");
  const loginhandle = (data) =>{
    setIsLoggedIN(data);
  }
  const loginSTUhandle = (data) =>{
    setIsSTULoggedIN(data);
  }
  const STUrole = (data) =>{
    setRole(data);
  }
  const CANrole = (data) =>{
    setRole(data);
  }
  return (
    <>
    <CartProvider>
    <RoleContext.Provider value={role}>
      {!isloggedIn && !isSTUloggedIn && (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login-canteen" element={<LoginCanteen loginHandle={loginhandle} CANrole={CANrole} />} />
            <Route path="/login-student" element={<LoginStudent loginSTUHandle={loginSTUhandle} STUrole={STUrole} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
       )} 
      
      {isloggedIn && <AdditionalRoutes role={role}/>}
      {isSTUloggedIn && <AdditionalRoutes role={role}/>}
      </RoleContext.Provider>
      </CartProvider>
    </>
    
  );
}

export default App;
