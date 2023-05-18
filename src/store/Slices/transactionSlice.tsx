import { createSlice, current } from "@reduxjs/toolkit";
import Transaction from "../../Modals/transactions";
import api from "../api";
interface TransactionType{
    value: Transaction[]
}
const initialState: TransactionType = {value: api || []};
// return {...state, value: newObj}
export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const data = action.payload;
            const id = new Date().getTime();
            data.id = id;
            return {...state, value: data}
            // return [...current(state), { ...data }];
            // state.push(data);
            // const old = JSON.parse(localStorage.getItem("TS") || "[]");
        },
        updateTransaction: (state, action) => {
            const data = action.payload;
            // const local: Transaction[] =
            //     localStorage.getItem("TS") &&
            //     JSON.parse(localStorage.getItem("TS") as string);
            const newData = current(state.value).map((cur) => {
                if (cur.id === parseInt(data.id as string)) {
                    return { ...data };
                }
                return { ...cur };
            });
            return { ...state, value: newData };
            // localStorage.setItem("TS", JSON.stringify([...newArr]));
        },
        deleteTransaction: (state, action) => {
            const id: number = parseInt(action.payload);
            const data = current(state.value).filter((cur) => cur.id !== id)
            return { ...state, value: data };
            // return [...];
        },
        // increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

// Action creators are generated for each case reducer function
export const { addTransaction, updateTransaction, deleteTransaction } =
    transactionSlice.actions;

export default transactionSlice.reducer;
