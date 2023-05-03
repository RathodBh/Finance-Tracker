import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useTable from "./common/useTable";

const initialValues = {
  email: "",
  password: "",
  cpassword: "",
};

const SignUp = () => {
  const [val, setVal] = useState(initialValues);
  const [err, setErr] = useState(initialValues);

  const { checkVal } = useTable({ setErr });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    const email = val?.email;
    const password = val?.password;
    const cpassword = val?.cpassword;

    const Err1 = checkVal(
      email.length === 0,
      "email",
      "Please enter a valid email"
    );
    const Err2 = checkVal(
      password.length === 0,
      "password",
      "Please enter a valid password"
    );
    const Err3 = checkVal(
      cpassword.length === 0,
      "cpassword",
      "Please enter a valid confirm password",
      password !== cpassword,
      "Please enter a same password"
    );

    if (Err1 && Err2 && Err3) {
      window.alert("Registration success, You can login now");
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
    }
  };

  const handleChange = (e) => {
    const eName = e.target.name;
    const eVal = e.target.value;
    setVal({
      ...val,
      [eName]: eVal,
    });
  };

  return (
    <>
      <div className="wrapper allCenter h-full">
        <form action="" className="w-50" onSubmit={handleSubmit}>
          <div className="m-2 allCenter">
            <h1>Sign Up</h1>
          </div>
          <div className="m-2">
            <TextField
              name="email"
              onChange={handleChange}
              defaultValue={val?.email}
              label="Enter Email"
              variant="outlined"
              className="w-100"
            />
            {err?.email && <span className="err">{err?.email}</span>}
          </div>
          <div className="m-2">
            <TextField
              name="password"
              onChange={handleChange}
              type="password"
              defaultValue={val?.password}
              label="Enter Password"
              variant="outlined"
              className="w-100"
            />
            {err?.password && <span className="err">{err?.password}</span>}
          </div>
          <div className="m-2">
            <TextField
              name="cpassword"
              onChange={handleChange}
              type="password"
              defaultValue={val?.cpassword}
              label="Enter Confirm Password"
              variant="outlined"
              className="w-100"
            />
            {err?.cpassword && <span className="err">{err?.cpassword}</span>}
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
