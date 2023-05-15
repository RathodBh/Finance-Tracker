import React from "react";
import Add from "./pages/Transactions/Add"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Show from "./pages/common/Show";
import ShowInfo from "./pages/Transactions/TransactionInfo";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoutes, { CheckLoginAuth } from "./utils/PrivateRoutes";

const RoutesFile = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<Navigate to="/finance-form" replace={true} />}
          />
          <Route exact path="/finance-form" element={<Add />} />
          <Route path="/finance-form/:id" element={<Add />} />
          <Route exact path="/transactions" element={<Show />} />
          <Route path="/transactions/:id" element={<ShowInfo />} />
        </Route>
        <Route element={<CheckLoginAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
