import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import usersApi from "../usersApi";
import Users from "../../Modals/users";
import axios, { AxiosResponse } from "axios";
// import English from "../../locals/english.json";
// import Hindi from "../../locals/hindi.json";
// import Gujarati from "../../locals/gujarati.json";
const initialState = {
    value: usersApi,
};
export const newUser: any = createAsyncThunk(
    "users/newUser",
    async (
        args: { email: string; password: string; confirm: string },
        { rejectWithValue }
    ) => {
        try {
            const data = await axios({
                method: "post",
                headers: { "Access-Control-Allow-Origin": "*" },
                url: `http://localhost:3456/user/add`,
                data: {
                    email: args?.email,
                    password: args?.password,
                },
            });

            return data.data;
        } catch (err) {
            rejectWithValue(err.response.data);
            console.log(err);
        }
    }
);
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(newUser.fulfilled, (state, action) => {
            const { email, password } = action.payload?.data;
            const all: Users[] = [
                ...current(state.value),
                {
                    email,
                    password,
                },
            ];
            return {
                ...state,
                value: all,
            };
        });
    },
});

export default usersSlice.reducer;
