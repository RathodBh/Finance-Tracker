import React from "react";
import Form from "./common/Form";

//MUI
import Navigation from "./common/Navigation";
export const NAME = "finance_tracker";

export const getData = () => {
  if (localStorage.getItem(NAME)) {
    return JSON.parse(localStorage.getItem(NAME));
  } else {
    return false;
  }
};

const Add = () => {
  return (
    <>
      <Navigation />
      <Form />
    </>
  );
};

export default Add;
