import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";

const NAME = "finance_tracker";
const monthsNames = [
  "Jan 2023",
  "Feb 2023",
  "Mar 2023",
  "Apr 2023",
  "May 2023",
  "Jun 2023",
  "Jul 2023",
  "Aug 2023",
  "Sep 2023",
  "Oct 2023",
  "Nov 2023",
  "Dec 2023",
];
const transactionTypes = ["Home Expense", "Personal Expense", "Income"];
const accountData = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

const Add = () => {
  useEffect(() => {
    if (getData() !== false) {
      setShowData(getData());
    }
  }, []);
  const [showData, setShowData] = useState();

  const getData = () => {
    if (localStorage.getItem(NAME)) {
      return JSON.parse(localStorage.getItem(NAME));
    } else {
      return false;
    }
  };
  const setData = (data) => {
    const oldData = getData();
    if (oldData !== false)
      localStorage.setItem(NAME, JSON.stringify([data, ...oldData]));
    else localStorage.setItem(NAME, JSON.stringify([data]));
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ele = e.target;

    const transDate = ele.transDate.value;
    const monthYear = ele.monthYear.value;
    const transactionType = ele.transactionType.value;
    const fromAccount = ele.fromAccount.value;
    const toAccount = ele.toAccount.value;
    const amount = ele.amount.value;
    const formatAmount = parseInt(amount).toLocaleString("en-IN");
    const notes = ele.notes.value;
    const receipt = ele.receipt.files[0];
    const receiptInBase64 = await toBase64(receipt);
    const newData = {
      transDate: transDate,
      monthYear: monthYear,
      transactionType: transactionType,
      fromAccount: fromAccount,
      toAccount: toAccount,
      amount: formatAmount,
      notes: notes,
      receipt: receiptInBase64,
    };

    setData(newData);

    if (getData() !== false) {
      setShowData(getData());
    }
  };

  return (
    <>
      <h1>Finance Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Transaction date</label>
          <input type="date" name="transDate" />
        </div>
        <div>
          <label htmlFor="">Month Year</label>
          <select name="monthYear">
          {/* <option selected hidden disabled>
              Select Month year
            </option> */}
            {monthsNames.map((month, i) => (
              <option value={month} key={i}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Transaction Type</label>
          <select name="transactionType">
            {/* <option selected hidden disabled>
              Select Transaction type
            </option> */}
            {transactionTypes.map((t, i) => (
              <option value={t} key={i}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Transaction: From Account</label>
          <select name="fromAccount">
            {/* <option selected hidden disabled>
              From Account
            </option> */}
            {accountData.map((a, i) => (
              <option value={a} key={i}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Transaction: To Account</label>
          <select name="toAccount">
            {/* <option selected hidden disabled>
              To Account
            </option> */}
            {accountData.map((a, i) => (
              <option value={a} key={i}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Amount:</label>
          <input type="number" name="amount" />
        </div>

        <div>
          <label htmlFor="">Receipt:</label>
          <input type="file" name="receipt" />
        </div>

        <div>
          <label htmlFor="">Notes:</label>
          <textarea name="notes" />
        </div>

        <div>
          <button>SUBMIT</button>
        </div>
      </form>

      <div>
        <ShowData data={showData} />
      </div>
    </>
  );
};

export default Add;
