import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";


const userSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(4).max(16).required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "password and confirm password should be the same"
    )
    .required("Please enter your confirm password"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const submitData = ({ email, password }) => {
    // window.alert("Registration success, You can login now");
    console.log(email, password);
    toast.success("Hello");
    let oldData = [];
    if (localStorage.getItem("FinanceUsers")) {
      oldData = JSON.parse(localStorage.getItem("FinanceUsers"));
    }
    localStorage.setItem(
      "FinanceUsers",
      JSON.stringify([
        ...oldData,
        {
          email,
          password,
        },
      ])
    );
  };

  return (
    <>
      <div className="wrapper allCenter h-full">
        <form action="" className="w-50" onSubmit={handleSubmit(submitData)}>
          <div className="m-2 allCenter">
            <h1>Sign Up</h1>
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
              <span className="err">{errors?.email?.message}</span>
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
              <span className="err">{errors?.password?.message}</span>
            )}
          </div>
          <div className="m-2">
            <TextField
              name="cpassword"
              type="password"
              label="Enter Confirm Password"
              variant="outlined"
              className="w-100"
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword && (
              <span className="err">{errors?.confirmPassword?.message}</span>
            )}
          </div>
          <Button variant="contained" className="w-100" type="submit">
            Sign Up
          </Button>

          <p className="m-2">
            Already have an account? <Link to="/login">Login </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
