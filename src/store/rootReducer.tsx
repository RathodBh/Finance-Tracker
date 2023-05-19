import { combineReducers } from "@reduxjs/toolkit";
import transactionReducer from "./Slices/transactionSlice";
import languagesReducer from "./Slices/languagesSlice";
import usersReducer from "./Slices/usersSlice";


const rootReducer = combineReducers({
    transaction: transactionReducer,
    languages: languagesReducer,
    users: usersReducer,
});
export default rootReducer;

