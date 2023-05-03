import React, { useState } from "react";

const Search = ({ oldData, setData }) => {

const [dataFound, setDataFound] = useState('');
  const search = (e) => {
    const searchValue = e.target.value;
    const cloneData = [...oldData];

    const searchRes = cloneData.filter((curData) => {
      if (
        curData.transDate.includes(searchValue) ||
        curData.notes.includes(searchValue) ||
        curData.toAccount.includes(searchValue) ||
        curData.fromAccount.includes(searchValue) ||
        curData.transactionType.includes(searchValue) ||
        curData.amount.includes(searchValue) ||
        curData.monthYear.includes(searchValue)
      ) {
        return curData;
      }
    });

    setData(searchRes);

    if(searchValue){
        if(searchRes.length === 0){
            setDataFound(`No Data found`)
        }else{
            setDataFound(`${searchRes.length} Data found`)
        }
    }else{
        setDataFound(``)
    }
  };
  return (
    <>
      <form className="allCenter">
        <input
          type="search"
          className="w-50"
          placeholder="Search"
          onChange={search}
        />
      </form>
      <div className="allCenter">
        <span className="msg">{dataFound}</span>
      </div>
    </>
  );
};

export default Search;
