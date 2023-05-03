import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Add from "./pages/Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowData from "./pages/ShowData";
import ShowInfo from "./pages/ShowInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes, { CheckLoginAuth } from "./utils/PrivateRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/finance-form" index element={<Add />} />
        <Route path="/finance-form/:id" element={<Add />} />
        <Route exact path="/showInfo" element={<ShowInfo />} />
      </Route>
      <Route element={<CheckLoginAuth/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
