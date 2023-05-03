import React, { useState } from "react";
import ShowData from "./ShowData";
import GroupBy from "./GroupBy";
import Form from "./common/Form";

//MUI
import Navigation from "./common/Navigation";
import Search from "./Search";
export const NAME = "finance_tracker";

export const getData = () => {
  if (localStorage.getItem(NAME)) {
    return JSON.parse(localStorage.getItem(NAME));
  } else {
    return false;
  }
};

const Add = () => {
  const [showData, setShowData] = useState();
  const [oldData, setOldData] = useState();

  return (
    <>
      <Navigation />

      <Form setShowData={setShowData} setOldData={setOldData} />

      <GroupBy oldData={oldData} setData={setShowData} />

      <div className="m-2">
        <Search oldData={oldData} setData={setShowData} />
      </div>

      <div className="m-2">
        <ShowData data={showData} oldData={oldData} />
      </div>
    </>
  );
};

export default Add;
