import React, { useState } from "react";

const Search = ({ setMy, oldData }) => {
  const [dataFound, setDataFound] = useState("");

  const search = (e) => {
    const searchValue = e.target.value;
    const cloneData = [...oldData];

    const searchRes = cloneData?.filter(
      (curData) =>
        curData?.transDate?.includes(searchValue) ||
        curData?.notes?.includes(searchValue) ||
        curData?.toAccount?.includes(searchValue) ||
        curData?.fromAccount?.includes(searchValue) ||
        curData?.transactionType?.includes(searchValue) ||
        curData?.amount?.toString()?.includes(searchValue) ||
        curData?.monthYear?.includes(searchValue)
    );

    setMy(searchRes);

    if (searchValue) {
      if (searchRes?.length === 0) {
        setDataFound(`No Data found`);
      } else {
        setDataFound(`${searchRes.length} Data found`);
      }
    } else {
      setDataFound(``);
    }
  };
  return (
    <>
      <form className="allCenter">
        <input
          type="search"
          className="w-100"
          placeholder="Search"
          onChange={search}
        />
      </form>
      <div className="allCenter">
        <span className="" style={{ color: "white !important" }}>
          {dataFound}
        </span>
      </div>
    </>
  );
};

export default Search;
