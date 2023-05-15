import React from "react";
// import { getData } from "../../services/LocalStorageService";
import ShowData from "../Transactions/Transactions";
import Navigation from "./Navigation";
import GroupBy from "./GroupBy";

const Show = () => {
  
  return (
    <>
      <Navigation />
      <GroupBy />

      <ShowData />
    </>
  );
};

export default Show;
