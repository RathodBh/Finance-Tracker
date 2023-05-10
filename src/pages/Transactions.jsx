import React from "react";

import MaterialTable from "./common/MaterialTable";
import useFinanceContext from "../context/FinanceContext";

const ShowData = () => {
  const { trans: data, group } = useFinanceContext();

  return (
    <>
      {/* if group by data is not found => show normal table  */}
      {JSON.stringify(group) === "{}" && (
        <>
          <MaterialTable arr={data} />
        </>
      )}

      {/* if group by data  => show group table  */}
      {JSON.stringify(group) !== "{}" && (
        <>
          {Object.keys(group)?.map((curKey, index) => {
            return (
              <MaterialTable
                key={index}
                title={curKey}
                arr={group[curKey]}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default ShowData;
