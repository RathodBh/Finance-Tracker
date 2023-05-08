import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useTable from "./common/useValidation";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [err, setErr] = useState(initialValues);
  const [val, setVal] = useState(initialValues);

  const { checkVal } = useTable({ setErr });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const Err1 = checkVal(
      val?.email?.length === 0,
      "email",
      "Please enter a valid email"
    );

    const Err2 = checkVal(
      val?.password?.length === 0,
      "password",
      "Please enter a valid password"
    );

    if (Err1 && Err2) {
      const allData = JSON.parse(localStorage.getItem("FinanceUsers"));

      const res = allData?.filter(
        (user) => user.email === val?.email && user.password === val?.password
      );

      const userEmail = res && res[0]?.email;
      if (res?.length > 0) {
        const abc = "abcdefghijklmnopqrstuvwxyz1234567890";
        let auth = "";
        for (let i = 0; i < 16; i++) {
          auth += abc[Math.floor(Math.random() * abc.length)];
        }
        localStorage.setItem("FinanceToken", JSON.stringify({auth,email:userEmail}));

        navigate("/finance-form");
      } else {
        setVal(initialValues);
        checkVal(1, "password", "Invalid username or password");
      }

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
            <h1>Sign In</h1>
          </div>
          <div className="m-2">
            <TextField
              name="email"
              onChange={handleChange}
              value={val?.email}
              label="Enter Email"
              variant="outlined"
              className="w-100"
            />
            {err?.email && <span className="err">{err?.email}</span>}
          </div>
          <div className="m-2">
            <TextField
              name="password"
              type="password"
              onChange={handleChange}
              value={val?.password}
              label="Enter Password"
              variant="outlined"
              className="w-100"
            />
            {err?.password && <span className="err">{err?.password}</span>}
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
