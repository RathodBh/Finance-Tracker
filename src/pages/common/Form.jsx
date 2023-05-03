import React, { useEffect, useRef, useState } from "react";
import useTable from "./useTable";
import { NAME } from "../Add";
import { getData } from "../Add";
//MUI
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate, useParams } from "react-router-dom";

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

export const monthsNames = [
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
export const transactionTypes = ["Home Expense", "Personal Expense", "Income"];
export const accountData = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

const initialValues = {
  transDate: "",
  monthYear: "",
  transactionType: "",
  fromAccount: "",
  toAccount: "",
  amount: "",
  notes: "",
  receipt: "",
};

const setData = (data) => {
  const oldData = getData();
  if (oldData !== false)
    localStorage.setItem(NAME, JSON.stringify([data, ...oldData]));
  else localStorage.setItem(NAME, JSON.stringify([data]));
};

const Form = ({ setShowData, setOldData }) => {
  const [err, setErr] = useState({});
  const [val, setVal] = useState(initialValues);

  const fileRef = useRef();
  const { checkVal } = useTable({ setErr });
  const { id } = useParams();
  const navigate = useNavigate();

  const checkMode = () => {
    if (id) {
      const allData = getData();
      const thisData = allData.find(
        (user) => parseInt(user.id) === parseInt(id)
      );
      setVal(thisData);
    }
  };

  useEffect(() => {
    if (getData() !== false) {
      setShowData(getData());
      setOldData(getData());
    }
  }, []);

  useEffect(() => {
    if (id) checkMode();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transDate = val?.transDate;
    const monthYear = val?.monthYear;
    const transactionType = val?.transactionType;
    const fromAccount = val?.fromAccount;
    const toAccount = val?.toAccount;
    const amount = val?.amount;
    const notes = val?.notes;

    const receipt = val?.receipt;

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
      "Please select a transaction to account",
      fromAccount === toAccount,
      "Please select different accounts to transaction"
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
        id: !!id ? parseInt(id) : uniqueId,
        transDate,
        monthYear,
        transactionType,
        fromAccount,
        toAccount,
        amount,
        notes,
        receipt,
      };
      if (!!id) {
        const allData = getData();
        const updatedData = allData.map((data) => {
          if (parseInt(data.id) === parseInt(id)) {
            return { ...newData };
          }
          return data;
        });
        localStorage.setItem(NAME, JSON.stringify([...updatedData]));

        setVal(initialValues);
        navigate("/finance-form");
      } else {
        setData(newData);
      }

      if (getData() !== false) {
        setShowData(getData());
        setOldData(getData());
      }
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleChange = (e) => {
    const keyName = e.target.name;
    const keyValue = e.target.value;
    setVal({
      ...val,
      [keyName]: keyValue,
    });
  };
  const previewImg = async (e) => {
    const img = e.target.files[0];
    const keyName = e.target.name;
    if (
      !(
        img.type.includes("png") ||
        img.type.includes("jpg") ||
        img.type.includes("jpeg")
      )
    ) {
      setErr((err) => ({
        ...err,
        receipt: "Type invalid, Only png,jpg and jpeg allowed",
      }));
    } else {
      const keyValue = await toBase64(img);
      setVal({
        ...val,
        [keyName]: keyValue,
      });
      setErr((err) => ({
        ...err,
        receipt: "",
      }));
    }
  };

  const removeImg = () => {
    fileRef.current.value = null;
    setVal({ ...val, receipt: "" });
  };
  return (
    <>
      <div className="allCenter m-2">
        <h1>{id ? "Edit data" : "Add data"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Transaction date</label>
            <input
              type="date"
              name="transDate"
              onChange={handleChange}
              value={val?.transDate}
            />
            <span className="err">{err?.transDateErr}</span>
          </div>

          <div>
            <label htmlFor="">Month Year</label>
            <select
              name="monthYear"
              onChange={handleChange}
              value={val?.monthYear}
            >
              <option hidden disabled value="">
                Select Month year
              </option>
              {monthsNames?.length > 0 &&
                monthsNames?.map((month, i) => (
                  <option value={month} key={i}>
                    {month}
                  </option>
                ))}
            </select>
            <span className="err">{err?.monthYearErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction Type</label>
            <select
              name="transactionType"
              onChange={handleChange}
              value={val?.transactionType}
            >
              <option disabled value="">
                Select Transaction type
              </option>
              {transactionTypes.length > 0 &&
                transactionTypes?.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
            </select>
            <span className="err">{err?.transactionTypeErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction: From Account</label>
            <select
              name="fromAccount"
              onChange={handleChange}
              value={val?.fromAccount}
            >
              <option disabled value="">
                From Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            <span className="err">{err?.fromAccountErr}</span>
          </div>

          <div>
            <label htmlFor="">Transaction: To Account</label>
            <select
              name="toAccount"
              onChange={handleChange}
              value={val?.toAccount}
            >
              <option disabled value="">
                To Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            <span className="err">{err?.toAccountErr}</span>
          </div>

          <div>
            <label htmlFor="">Amount:</label>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              value={val?.amount}
            />
            <span className="err">{err?.amountErr}</span>
          </div>

          <div>
            <label htmlFor="">Receipt:</label>
            <input
              type="file"
              name="receipt"
              ref={fileRef}
              onChange={previewImg}
              style={{ border: "1px solid gray" }}
              className="m-2"
            />
            <span className="err">{err?.receipt}</span>
            {val?.receipt && (
              <>
                <img
                  src={val?.receipt}
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                  }}
                />
                <span
                  className="allCenter"
                  style={{
                    display: "inline-block",
                    width: "auto",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "1px solid gainsboro",
                  }}
                  onClick={removeImg}
                >
                  <DeleteIcon />
                </span>
              </>
            )}
          </div>

          <div>
            <label htmlFor="">Notes:</label>
            <textarea name="notes" onChange={handleChange} value={val?.notes} />
            <span className="err">{err.notesErr}</span>
          </div>

          <div>
            <Button variant="contained" type="submit">
              {id ? "UPDATE" : "ADD DATA"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
