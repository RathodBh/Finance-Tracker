export const NAME = "finance_tracker";

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