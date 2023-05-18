import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./utils/ErrorBoundary";
import { Provider } from "react-redux";
import {store} from "./store/Index"
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <ErrorBoundary>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </>
);
