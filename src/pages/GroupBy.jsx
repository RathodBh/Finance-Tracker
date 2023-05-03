import React, { useState } from "react";
import { columns } from "./common/Form";

const GroupBy = ({ oldData, setData }) => {
  const [toggleRemove, setToggleRemove] = useState("d-none");
  const setGroupBy = (e) => {
    setToggleRemove("");
    const fieldName = e.target.value;
    const cloneData = [...oldData];

    const groupByCategory = cloneData.reduce((group, product) => {
      const category = product[fieldName];
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group;
    }, {});

    setData(groupByCategory);
  };

  const removeFilter = () => {
    setData((prev) => oldData);
    setToggleRemove("d-none");
  };

  return (
    <>
      <form className="allCenter">
        <select name="groupBy" onChange={setGroupBy} className="w-50 p-2" defaultValue={""}> 
          <option value="" disabled>
            Select group by column
          </option>
          {columns.map((c, i) => (
            <option value={c.db} key={i}>
              {c.show}
            </option>
          ))}
        </select>

        <button type="button" variant="contained" onClick={removeFilter} className={`${toggleRemove} w-50 button`} style={{margin:"8px 0px"}}>
          Remove filter
        </button>
      </form>
    </>
  );
};

export default GroupBy;