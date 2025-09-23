import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainRegister from "./pages/CaptainRegister";
import Home from "./pages/Home";
import UserProtectorWrapper from "./pages/UserProtectorWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import "remixicon/fonts/remixicon.css";
import Riding from "./pages/Riding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-register" element={<CaptainRegister />} />
        <Route
          path="/home"
          element={
            <UserProtectorWrapper>
              <Home />
            </UserProtectorWrapper>
          }
        />
        <Route
          path="/user-logout"
          element={
            <UserProtectorWrapper>
              <UserLogout />
            </UserProtectorWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
