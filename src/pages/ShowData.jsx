import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MaterialTable from "./MaterialTable";

const ShowData = ({ data, oldData }) => {
  const [tempData, setTempData] = useState([{}]);
  const [sortMethod, setSortMethod] = useState(1);

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTempData(data);
    } else if (!Array.isArray(data)) {
      setTempData(oldData);
    }
  }, [data]);

  const sort = (name, title) => {
    if (sortMethod > 2) {
      setSortMethod((prev) => 1);
    } else {
      setSortMethod((prev) => sortMethod + 1);
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
    setTempData((prev) => cloneData);
  };
  return (
    <>
      {Array.isArray(data) && data.length > 0 && (
        <MaterialTable
          sort={sort}
          arr={tempData}
          sortMethod={sortMethod}
          scroll={scroll}
          setScroll={setScroll}
        />
      )}

      {data && !Array.isArray(data) && (
        <>
          {Object.keys(data).map((curKey) => (
            <MaterialTable
              title={curKey}
              sort={sort}
              arr={data[curKey]}
              sortMethod={sortMethod}
              scroll={scroll}
              setScroll={setScroll}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ShowData;
