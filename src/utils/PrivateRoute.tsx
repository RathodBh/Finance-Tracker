import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = false;
    if (localStorage.getItem("token")) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

const CheckLoginAuth = () => {
    let auth = true;
    if (localStorage.getItem("token")) {
        auth = false;
    }
    return auth ? <Outlet /> : <Navigate to="/transaction" />;
};

export { CheckLoginAuth };
export default PrivateRoutes;
