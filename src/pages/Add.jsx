import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";
import GroupBy from "./GroupBy";

//MUI
import { Button } from "@mui/material";
import Search from "./Search";

const NAME = "finance_tracker";
export const columns = [
  {
    show: "Transaction date",
    db: "transDate",
  },
  {
    show: "Transaction type",
    db: "transactionType",
  },
  {
    show: "Transfer from",
    db: "fromAccount",
  },

  {
    show: "Transfer to",
    db: "toAccount",
  },

  {
    show: "amount",
    db: "amount",
  },
  {
    show: "Receipt",
    db: "receipt",
  },
  {
    show: "Notes",
    db: "notes",
  },
];
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

export const getData = () => {
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
const Add = () => {
  useEffect(() => {
    if (getData() !== false) {
      setShowData(getData());
      setOldData(getData());
    }
  }, []);
  const [showData, setShowData] = useState();
  const [oldData, setOldData] = useState();
  const [err, setErr] = useState({});

  const checkVal = (
    condition,
    errName,
    msg,
    condition2 = false,
    msg2 = "",
    condition3 = false,
    msg3 = ""
  ) => {
    if (condition) {
      setErr((err) => ({
        ...err,
        [errName]: msg,
      }));
    } else if (condition2) {
      setErr((err) => ({
        ...err,
        [errName]: msg2,
      }));
    } else if (condition3) {
      setErr((err) => ({
        ...err,
        [errName]: msg3,
      }));
    } else {
      setErr((err) => ({
        ...err,
        [errName]: "",
      }));
      return true;
    }
    return false;
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
    // const formatAmount = parseInt(amount).toLocaleString("en-IN");
    const notes = ele.notes.value;

    const receipt = ele.receipt.files[0];
    let receiptInBase64 = null;
    if (!!receipt) {
      receiptInBase64 = await toBase64(receipt);
    }

    //validation error
    const Err1 = checkVal(
      transDate.length === 0,
      "transDateErr",
      "Please select a transaction date"
    );
    const Err2 = checkVal(
      monthYear.length === 0,
      "monthYearErr",
      "Please select a month Year"
    );
    const Err3 = checkVal(
      transactionType.length === 0,
      "transactionTypeErr",
      "Please select a transaction type"
    );
    const Err4 = checkVal(
      fromAccount.length === 0,
      "fromAccountErr",
      "Please select a transaction from account"
    );
    const Err5 = checkVal(
      toAccount.length === 0,
      "toAccountErr",
      "Please select a transaction to account"
    );
    const Err6 = checkVal(
      amount.length === 0,
      "amountErr",
      "Please enter amount"
    );
    const Err7 = checkVal(notes.length === 0, "notesErr", "Please enter note");

    if (Err1 && Err2 && Err3 && Err4 && Err5 && Err6 && Err7) {
      const uniqueId = new Date().getTime();
      const newData = {
        id: uniqueId,
        transDate: transDate,
        monthYear: monthYear,
        transactionType: transactionType,
        fromAccount: fromAccount,
        toAccount: toAccount,
        amount: amount,
        notes: notes,
        receipt: receiptInBase64,
      };

      setData(newData);

      if (getData() !== false) {
        setShowData(getData());
        setOldData(getData());
      }
    }
  };

  return (
    <>
      <div className="allCenter">
        <h1>Finance Tracker</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Transaction date</label>
            <input type="date" name="transDate" />
            <span className="err">{err.transDateErr}</span>
          </div>
          <div>
            <label htmlFor="">Month Year</label>
            <select name="monthYear" defaultValue={""}>
              <option  hidden disabled value="">
                Select Month year
              </option>
              {monthsNames.map((month, i) => (
                <option value={month} key={i}>
                  {month}
                </option>
              ))}
            </select>
            <span className="err">{err.monthYearErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction Type</label>
            <select name="transactionType" defaultValue={""}>
              <option  disabled value="">
                Select Transaction type
              </option>
              {transactionTypes.map((t, i) => (
                <option value={t} key={i}>
                  {t}
                </option>
              ))}
            </select>
            <span className="err">{err.transactionTypeErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction: From Account</label>
            <select name="fromAccount" defaultValue={""}>
              <option  disabled value="">
                From Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            <span className="err">{err.fromAccountErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction: To Account</label>
            <select name="toAccount" defaultValue={""}>
              <option  disabled value="">
                To Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            <span className="err">{err.toAccountErr}</span>
          </div>

          <div>
            <label htmlFor="">Amount:</label>
            <input type="number" name="amount" />
            <span className="err">{err.amountErr}</span>
          </div>

          <div>
            <label htmlFor="">Receipt:</label>
            <input type="file" name="receipt" />
          </div>

          <div>
            <label htmlFor="">Notes:</label>
            <textarea name="notes" />
            <span className="err">{err.notesErr}</span>
          </div>

          <div>
            <Button variant="contained" type="submit">
              SUBMIT
            </Button>
          </div>
        </form>
      </div>

      <GroupBy oldData={oldData} setData={setShowData} />

      <div className="m-2">
        <Search oldData={oldData} setData={setShowData}/>
      </div>

      <div className="m-2">
        <ShowData data={showData} oldData={oldData} />
      </div>
    </>
  );
};

export default Add;
