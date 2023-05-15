import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./slices/financeSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./slices/userSlice";

const persistConfig = {
    key: "finance",
    storage,
};

const persistedReducer = persistReducer(persistConfig, financeReducer);
const persistUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        finance: persistedReducer,
        users: persistUserReducer
    },
});

export const persistor = persistStore(store);
export default store;