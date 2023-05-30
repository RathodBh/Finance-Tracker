import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Transaction from "../../Modals/transactions";
import api from "../api";
import axios, { AxiosResponse } from "axios";
import React from "react";
interface TransactionType {
    value: Transaction[];
}
export const addTransaction = createAsyncThunk(
    "transaction/addTransaction",
    async (args: Transaction, { rejectWithValue }) => {
        try {
            const data: AxiosResponse = await axios({
                method: "post",
                headers: { "Access-Control-Allow-Origin": "*" },
                url: `http://localhost:3456/transaction/add`,
                data: {
                    id: new Date().getTime(),
                    transaction_date: args?.transDate,
                    month_year: args?.monthYear,
                    transaction_type: args?.transactionType,
                    from_account: args?.fromAccount,
                    to_account: args?.toAccount,
                    amount: args?.amount,
                    notes: args?.notes,
                    receipt:
                        (args?.receipt as string).length > 0
                            ? (args?.receipt as string)
                            : "",
                    user_id: 1,
                },
            });

            return data.data;
        } catch (err) {
            console.log(err);
            rejectWithValue(err.response.data);
        }
    }
);
export const updateTransaction = createAsyncThunk(
    "transaction/updateTransaction",
    async (args: Transaction, { rejectWithValue }) => {
        try {
            console.log("Updating Arguments: ", args);
            const data: AxiosResponse = await axios({
                method: "post",
                headers: { "Access-Control-Allow-Origin": "*" },
                url: `http://localhost:3456/transaction/edit/${args?.id}`,
                data: {
                    transaction_date: args?.transDate,
                    month_year: args?.monthYear,
                    transaction_type: args?.transactionType,
                    from_account: args?.fromAccount,
                    to_account: args?.toAccount,
                    amount: args?.amount,
                    notes: args?.notes,
                    receipt:
                        (args?.receipt as string).length > 0
                            ? (args?.receipt as string)
                            : "",
                    user_id: 1,
                },
            });

            return data.data;
        } catch (err) {
            console.log(err);
            rejectWithValue(err.response.data);
        }
    }
);
const initialState: TransactionType = { value: api || [] };
export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        // updateTransaction: (state, action) => {
        //     const data = action.payload;
        //     const newData = current(state.value)?.map((cur) => {
        //         if (cur.id === parseInt(data.id as string)) {
        //             return { ...data };
        //         }
        //         return { ...cur };
        //     });
        //     return { ...state, value: newData };
        // },
        deleteTransaction: (state, action) => {
            const id: number = parseInt(action.payload);
            const data = current(state.value)?.filter((cur) => cur?.id !== id);
            return { ...state, value: data };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTransaction.fulfilled, (state, action) => {
            const data = action.payload.data;
            const newData: Transaction = {
                transDate: data?.transaction_date,
                monthYear: data?.month_year,
                transactionType: data?.transaction_type,
                fromAccount: data?.from_account,
                toAccount: data?.to_account,
                amount: data?.amount,
                notes: data?.notes,
                receipt: data?.receipt || "",
                id: data?.id,
            };
            return { ...state, value: [...current(state.value), newData] };
        });

        builder.addCase(updateTransaction.fulfilled, (state, action) => {
            const data = action.payload.data;
            const newData = current(state.value)?.map((cur) => {
                if (cur.id === parseInt(data.id as string)) {
                    return { ...data };
                }
                return { ...cur };
            });
            // const data = action.payload.data;
            // const newReduxData: Transaction = {
            //     transDate: data?.transaction_date,
            //     monthYear: data?.month_year,
            //     transactionType: data?.transaction_type,
            //     fromAccount: data?.from_account,
            //     toAccount: data?.to_account,
            //     amount: data?.amount,
            //     notes: data?.notes,
            //     receipt: data?.receipt || "",
            //     id: data?.id,
            // };

            //     return { ...state, value: newData };

            // return { ...state, value: [...current(state.value), newData] };
        });
    },
});

// Action creators are generated for each case reducer function
export const { deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
