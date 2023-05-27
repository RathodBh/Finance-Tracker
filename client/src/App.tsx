import React from "react";
import RoutesFile from "./Route";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RoutesFile />
        </BrowserRouter>
    );
};

export default App;
