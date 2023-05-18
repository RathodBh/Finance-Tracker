import { createSlice, current } from "@reduxjs/toolkit";
import Transaction from "../../Modals/transactions";
import api from "../api";
interface TransactionType{
    value: Transaction[]
}
const initialState: TransactionType = {value: api || []};
export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const data = action.payload;
            data.id = new Date().getTime();
            return {...state, value: data}
        },
        updateTransaction: (state, action) => {
            const data = action.payload;
            const newData = current(state.value).map((cur) => {
                if (cur.id === parseInt(data.id as string)) {
                    return { ...data };
                }
                return { ...cur };
            });
            return { ...state, value: newData };
        },
        deleteTransaction: (state, action) => {
            const id: number = parseInt(action.payload);
            const data = current(state.value).filter((cur) => cur.id !== id)
            return { ...state, value: data };
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTransaction, updateTransaction, deleteTransaction } =
    transactionSlice.actions;

export default transactionSlice.reducer;
