import React, { useState } from "react";
import { getData } from "../Add";
import ShowData from "../Transactions";
import Navigation from "./Navigation";
import GroupBy from "../GroupBy";

const Show = () => {
  const allData = getData();
  const oldData = [...allData];

  const [data, setData] = useState([...allData]);

  return (
    <>
      <Navigation />
      <GroupBy oldData={oldData} setData={setData} />

      <ShowData data={data} oldData={oldData} setData={setData}/>    
    </>
  );
};

export default Show;
