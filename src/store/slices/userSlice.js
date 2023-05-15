import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [
        { email: "111rathodbhavesh@gmail.com", password: "Bhavesh" },
        { email: "manoj@gmail.com", password: "aaaaa" },
    ],
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
