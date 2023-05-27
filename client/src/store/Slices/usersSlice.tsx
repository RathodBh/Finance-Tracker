import { createSlice, current } from "@reduxjs/toolkit";
import usersApi from "../usersApi";
import Users from "../../Modals/users";
// import English from "../../locals/english.json";
// import Hindi from "../../locals/hindi.json";
// import Gujarati from "../../locals/gujarati.json";
const initialState = {
    value: usersApi,
};
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = action.payload;
            const all: Users[] = [
                ...current(state.value),
                {
                    email: user.email as string,
                    password: user.password as string,
                },
            ];
            
            return {
                ...state,
                value: all,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
