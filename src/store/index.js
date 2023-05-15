import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./slices/financeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./slices/userSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
    key: "finance",
    storage,
};

const persistedReducer = persistReducer(persistConfig, financeReducer);
const persistUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        finance: persistedReducer,
        users: persistUserReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
