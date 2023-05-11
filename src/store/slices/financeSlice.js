import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const financeSlice = createSlice({
    name: "financesss",
    initialState: {
        trans: api,
        group: {},
    },
    reducers: {
        setTrans: (state,action) => {
            state.trans = action.payload;
        },
        setGroup: (state, action) => {
            state.group = action.payload;
        },
    },
});
export const { setTrans, setGroup } = financeSlice.actions;
export default financeSlice.reducer;
