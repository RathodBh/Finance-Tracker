import React from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import generate from "../../utils/generateToken";

const loginSchema = yup.object().shape({
    email: yup.string().email().required("Please enter email"),
    password: yup.string().required("Please enter password"),
});

const Login = () => {
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.users);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const submitData = ({ email, password }) => {
        const allData = [...users];

        const res = allData?.filter(
            (user) => user.email === email && user.password === password
        );

        const userEmail = res && res[0]?.email;
        if (res?.length > 0) {
            const auth = generate();
            localStorage.setItem(
                "FinanceToken",
                JSON.stringify({ auth, email: userEmail })
            );
            toast.success("Login successfully");

            navigate("/finance-form");
        } else {
            toast.error("Email or password is incorrect");
        }
    };

    return (
        <>
            <div className="wrapper allCenter h-full">
                <form
                    action=""
                    className="w-50"
                    onSubmit={handleSubmit(submitData)}
                >
                    <div className="m-2 allCenter">
                        <h1>Sign In</h1>
                    </div>
                    <div className="m-2">
                        <TextField
                            name="email"
                            label="Enter Email"
                            variant="outlined"
                            className="w-100"
                            {...register("email")}
                        />
                        {errors?.email && (
                            <span className="err">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="m-2">
                        <TextField
                            name="password"
                            type="password"
                            label="Enter Password"
                            variant="outlined"
                            className="w-100"
                            {...register("password")}
                        />
                        {errors?.password && (
                            <span className="err">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                    <Button variant="contained" className="w-100" type="submit">
                        SUBMIT
                    </Button>
                    <p className="m-2">
                        Don't have an account? Create now{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
