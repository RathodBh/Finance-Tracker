import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Add from "./pages/Add";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Show from "./pages/common/Show";
import ShowInfo from "./pages/TransactionInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes, { CheckLoginAuth } from "./utils/PrivateRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoutes />}>
        
        <Route path="/" element={<Navigate to="/finance-form" replace={true} />} />
        <Route path="/finance-form" element={<Add />} />
        <Route exact path="/transactions" element={<Show />} />
        <Route path="/transactions/:id" element={<ShowInfo />} />
        {/* <Route path="*" index element={<Add />} /> */}
      </Route>
      <Route element={<CheckLoginAuth/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
