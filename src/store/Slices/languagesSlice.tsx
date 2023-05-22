import { createSlice } from "@reduxjs/toolkit";
import English from "../../locals/english.json";
import Hindi from "../../locals/hindi.json";
import Gujarati from "../../locals/gujarati.json";

const initialState = {
    value: English,
};
export const languagesSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            switch (action.payload) {
                case "Hindi":
                    return { value: Hindi };
                case "Gujarati":
                    return { value: Gujarati };
                default:
                    return { value: English };
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLanguage } = languagesSlice.actions;

export default languagesSlice.reducer;
