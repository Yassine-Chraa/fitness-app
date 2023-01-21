import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { MaterialUIControllerProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";


if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));

    root.render(
        <BrowserRouter>
            <MaterialUIControllerProvider>
                <App />
            </MaterialUIControllerProvider>
        </BrowserRouter>
    );
};
