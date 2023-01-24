import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import { MaterialUIControllerProvider } from "./dashboardContext";
import {APIHandlerProvider} from "./apiContext/API/APIHandlerProvider";

if (document.getElementById("dashboard")) {
    const root = ReactDOM.createRoot(document.getElementById("dashboard"));

    root.render(
        <APIHandlerProvider>
            <BrowserRouter>
                <MaterialUIControllerProvider>
                    <App />
                </MaterialUIControllerProvider>
            </BrowserRouter>
        </APIHandlerProvider>
    );
}
