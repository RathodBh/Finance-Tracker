import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("token");

    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/");
    }, []);
    return <div>Logout successfully</div>;
};

export default Logout;
