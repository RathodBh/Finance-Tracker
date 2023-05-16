import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = false;
    if (localStorage.getItem("FinanceToken")) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

const CheckLoginAuth = () => {
    let auth = true;
    if (localStorage.getItem("FinanceToken")) {
        auth = false;
    }
    return auth ? <Outlet /> : <Navigate to="/finance-form" />;
};

export { CheckLoginAuth };
export default PrivateRoutes;
