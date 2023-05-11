import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./slices/financeSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "finance",
    storage,
};

const persistedReducer = persistReducer(persistConfig, financeReducer);

const store = configureStore({
    reducer: {
        finance: persistedReducer,
    },
});

export const persistor = persistStore(store);
export default store;