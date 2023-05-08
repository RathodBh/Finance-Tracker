import React, { useState } from "react";
import { getData } from "../../services/LocalStorageService";
import ShowData from "../Transactions";
import Navigation from "./Navigation";
import GroupBy from "../GroupBy";

const Show = () => {
  const allData = getData();
  const oldData = allData && [...allData];

  const [data, setData] = useState(oldData);

  return (
    <>
      <Navigation />
      <GroupBy oldData={oldData} setData={setData} />

      <ShowData data={data} oldData={oldData} />
    </>
  );
};

export default Show;
