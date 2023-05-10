import React, { useState } from "react";
import { columns } from "../utils/Constants";
import useFinanceContext from "../context/FinanceContext";

const GroupBy = () => {
  const [toggleRemove, setToggleRemove] = useState("d-none");

  const {trans, setGroup } = useFinanceContext();

  const setGroupBy = (e) => {
    setToggleRemove("");
    const fieldName = e.target.value;
    const cloneData = trans && [...trans];

    const groupByCategory = cloneData?.length > 0 && cloneData?.reduce((group, product) => {
      const category = product[fieldName];
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group;
    }, {});

    setGroup(groupByCategory);
  };

  const removeFilter = () => {
    setGroup({});
    setToggleRemove("d-none");
  };

  return (
    <>
      <form className="allCenter">
        <select name="groupBy" onChange={setGroupBy} className="w-50 p-2" defaultValue={""}>
          <option value="" disabled>
            Select group by column
          </option>
          {columns?.filter((cur)=>cur.db!=="receipt").map((c, i) => (
            <option value={c.db} key={i}>
              {c.show}
            </option>
          ))}
        </select>

        <button type="button" variant="contained" onClick={removeFilter} className={`${toggleRemove} w-50 button`} style={{ margin: "8px 0px" }}>
          Remove filter
        </button>
      </form>
    </>
  );
};

export default GroupBy;
