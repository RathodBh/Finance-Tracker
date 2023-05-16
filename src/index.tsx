import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./utils/ErrorBoundary";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </>
);
