import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Show from "./pages/common/Show";
// import ShowInfo from "./pages/Transactions/TransactionInfo";
// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
// import PrivateRoutes, { CheckLoginAuth } from "./utils/PrivateRoute";
import TransactionForm from "./Components/Transactions/TransactionForm";
// import Form from "./Components/Form/Index";
import ShowTransaction from "./Components/Transactions/ShowTransaction";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import PrivateRoutes, { CheckLoginAuth } from "./utils/PrivateRoute";

const RoutesFile = () => {
    return (
        // <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route
                    path="/"
                    element={<Navigate to="/transaction" replace={true} />}
                />
                <Route path="/transaction" element={<TransactionForm />} />
                <Route path="/transaction/:id" element={<TransactionForm />} />
                <Route path="/show-transaction" element={<ShowTransaction />} />
            </Route>
            <Route element={<CheckLoginAuth />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
            </Route>
        </Routes>
        // </BrowserRouter>
    );
};

export default RoutesFile;
