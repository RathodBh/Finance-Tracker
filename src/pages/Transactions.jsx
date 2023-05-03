import React, { useEffect, useState } from "react";

import MaterialTable from "./common/MaterialTable";

const ShowData = ({ data, oldData, setData }) => {
  const [tempData, setTempData] = useState([{}]);
  const [sortMethod, setSortMethod] = useState(1);
  
  useEffect(() => {
    if (Array.isArray(data)) {
      setTempData(data);
    } else if (!Array.isArray(data)) {
      setTempData(oldData);
    }
  }, [data]);

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
        <MaterialTable
          sort={sort}
          arr={tempData}
          sortMethod={sortMethod}
          setData={setData}
          oldData={oldData}
        />
      )}

      {data && !Array.isArray(data) && (
        <>
          {Object.keys(data)?.map((curKey) => (
            <MaterialTable
              title={curKey}
              sort={sort}
              arr={data[curKey]}
              sortMethod={sortMethod}
              setData={setData}
              oldData={oldData}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ShowData;
