export const NAME: string = "finance_tracker";
export const MAX_FILE_SIZE: number = 1024 * 1024;
export const columns: { show: string; db: string }[] = [
    {
        show: "Transaction date",
        db: "transDate",
    },
    {
        show: "Month Year",
        db: "monthYear",
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

export const monthsNames: string[] = [
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
export const transactionTypes: string[] = [
    "Home Expense",
    "Personal Expense",
    "Income",
];
export const accountData: string[] = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle",
    "Core Realtors",
    "Big Block",
];
