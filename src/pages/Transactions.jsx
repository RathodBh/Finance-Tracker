import React, { useEffect, useState } from "react";

import MaterialTable from "./common/MaterialTable";
import useFinanceContext from "../context/FinanceContext";

const ShowData = () => {
  const { trans: data, oldData } = useFinanceContext();
  console.log("🚀 ~ file: Transactions.jsx:8 ~ ShowData ~ data:", data)

  const [tempData, setTempData] = useState([{}]);
  const [sortMethod, setSortMethod] = useState(1);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTempData(data);
    } else if (!Array.isArray(data)) {
      setTempData(oldData);
    }
  }, [data, oldData]);

  const sort = (name, title) => {
    if (sortMethod > 2) {
      setSortMethod(1);
    } else {
      setSortMethod(sortMethod + 1);
    }
    let cloneData = null;
    if (!title) {
      cloneData = [...data];
      if (sortMethod === 1) {
        cloneData = cloneData.sort((a, b) => (a[name] > b[name] ? 1 : -1));
      } else if (sortMethod === 2) {
        cloneData = cloneData.sort((a, b) => (a[name] < b[name] ? 1 : -1));
      }
    } else {
      cloneData = { ...data };

      Object.keys(cloneData).forEach((obj) => {
        if (obj === title) {
          if (sortMethod === 1) {
            cloneData[obj] = cloneData[obj].sort((a, b) =>
              a[name] > b[name] ? 1 : -1
            );
          } else if (sortMethod === 2) {
            cloneData[obj] = cloneData[obj].sort((a, b) =>
              a[name] < b[name] ? 1 : -1
            );
          }
        }
      });
    }
    setTempData(cloneData);
  };
  return (
    <>
      {Array.isArray(data) && (
        <MaterialTable sort={sort} arr={tempData} sortMethod={sortMethod} />
      )}

      {data && !Array.isArray(data) && (
        <>
          {Object.keys(data)?.map((curKey, index) => (
            <MaterialTable
              key={index}
              title={curKey}
              sort={sort}
              arr={data[curKey]}
              sortMethod={sortMethod}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ShowData;
