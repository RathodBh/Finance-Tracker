import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../services/cookie";

const PrivateRoutes = () => {
    const { token } = getCookie();
    console.log("🚀 ~ file: PrivateRoutes.js:6 ~ PrivateRoutes ~ token:", token)
    let auth = false;

    if (token?.length > 0) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

const CheckLoginAuth = () => {
    let auth = true;
    const { token } = getCookie();

    if (token?.length > 0) {
        auth = false;
    }
    return auth ? <Outlet /> : <Navigate to="/finance-form" />;
};

export { CheckLoginAuth };
export default PrivateRoutes;
