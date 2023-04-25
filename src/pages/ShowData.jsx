import React from "react";

const ShowData = ({ data }) => {
  return (
    <>
      <table style={{width:"100%"}} border={1}>
        <tr>
          <th>#</th>
          <th>Transaction date</th>
          <th>Transaction type</th>
          <th>Transfer from</th>
          <th>Transfer to</th>
          <th>Amount</th>
          <th>Receipt</th>
          <th>Notes</th>
        </tr>

        {data?.map((d, i) => (
          <tr>
            <td>{i+1}</td>
            <td>{d.transDate}</td>
            <td>{d.transactionType}</td>
            <td>{d.fromAccount}</td>
            <td>{d.toAccount}</td>
            <td>{d.amount}</td>
            <td>
              <img src={d.receipt} alt="" style={{height:"150px",aspectRatio:"1/1",objectFit:"cover"}} />
            </td>
            <td>{d.notes}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ShowData;
