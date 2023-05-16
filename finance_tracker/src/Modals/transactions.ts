export default interface Transaction {
    transDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    notes: string;
    receipt?: FileList | File | string;
}