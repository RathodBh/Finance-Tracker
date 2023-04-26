import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Add from "./pages/Add";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowData from "./pages/ShowData";
import ShowInfo from "./pages/ShowInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Add />} />
      <Route path="/show" element={<ShowData />} />
      <Route exact path="/showInfo" element={<ShowInfo />} />
    </Routes>
  </BrowserRouter>
);
