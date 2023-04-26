import React, { useEffect, useState } from "react";

const columns = [
    {
        show:"Transaction date",
        db:"transDate"
    },
    {
        show: "Transaction type",
        db:"transactionType"
    },
    {
        show: "Transfer from",
        db:"fromAccount"
    },
  
    {
        show: "Transfer to",
        db:"toAccount"
    },
  
    {
        show: "amount",
        db:"amount"
    },
    {
        show: "Receipt",
        db:"receipt"
    },
    {
        show: "Notes",
        db:"notes"
    },
];

const ShowData = ({ data }) => {
  const [tempData, setTempData] = useState([{}]);
  const [sortMethod,setSortMethod] = useState(1)

  useEffect(() => {
    setTempData(data);
  }, [data]);

  const sort = (name) => {
    let cloneData = [...data];
    if(sortMethod > 2){
        setSortMethod(prev=> 1)
    }else{
        setSortMethod(prev => sortMethod+1)
    }
    console.log("Before sorting",sortMethod)

    if(sortMethod===1){
        cloneData = cloneData.sort((a, b) => (a[name] > b[name] ? 1 : -1));
    }else if(sortMethod===2){
        cloneData = cloneData.sort((a, b) => (a[name] < b[name] ? 1 : -1));
    }
    setTempData(prev=>cloneData);
    console.log("sorting",sortMethod)
  };
  return (
    <>
      <table style={{ width: "100%" }} border={1}>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((c, i) => (
              <th key={i}>  
                <span>{(sortMethod==1)? <>&#8661; </> : (sortMethod==2)? <>&#8657; </> : <>&#8659; </>}</span>
                <span onClick={(e) => sort(columns[i].db)}>{columns[i].show}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tempData?.map((d, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>{d.transDate}</td>
              <td>{d.transactionType}</td>
              <td>{d.fromAccount}</td>
              <td>{d.toAccount}</td>
              <td>&#8377; {d.amount}</td>
              <td>
                <img
                  src={d.receipt}
                  alt=""
                  style={{
                    height: "150px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowData;
