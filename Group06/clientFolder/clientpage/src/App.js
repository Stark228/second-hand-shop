import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Furniture from "./components/Furniture";
import Home from "./components/Home";
import LoginForm from "./components/login";
import RegistrationForm from "./components/signup";
import PaymentForm from "./components/paymentform";
import Cash from "./components/paycash";
import History from "./components/History";
import ForgotPassword from "./components/Forgotpassword";
import MyOrder from "./components/MyOrder";
import { ThemeProvider } from "./components/ThemProvider";



// App component
function App() {

 

  return (
    <BrowserRouter>
      
      <Routes>
      
        <Route path="/" element={<LoginForm/>} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route
          path="/home"element={<Home/>}
        />
        <Route path="/pay" element={<PaymentForm />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/His" element={<History />} />
        <Route path="/for" element={<ForgotPassword />} />
        <Route path="/ord" element={<MyOrder />} />
       
        <Route path="/furniture" element={<Furniture />} />
      
      
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
