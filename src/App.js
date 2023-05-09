import React from "react";
import RoutesFile from "./Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FinanceWrapperContext } from "./context/FinanceContext";
import ErrorBoundary from "./utils/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <FinanceWrapperContext>
        <RoutesFile />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </FinanceWrapperContext>
    </ErrorBoundary>
  );
};

export default App;
