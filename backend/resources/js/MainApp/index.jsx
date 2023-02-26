import "../bootstrap";
import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { APIHandlerProvider } from "./context/API/APIHandlerProvider";

if (document.getElementById("mainApp")) {
    const root = ReactDOM.createRoot(document.getElementById("mainApp"));

    root.render(
        <APIHandlerProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </APIHandlerProvider>
    );
}
