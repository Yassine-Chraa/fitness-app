import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import { MaterialUIControllerProvider } from "./context/UIContext";
import { APIHandlerProvider } from "./context/APIContext/APIHandlerProvider"

import "regenerator-runtime"

if (document.getElementById("dashboard")) {
    const root = ReactDOM.createRoot(document.getElementById("dashboard"));

    root.render(
        <MaterialUIControllerProvider>
            <APIHandlerProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </APIHandlerProvider>
        </MaterialUIControllerProvider>
    );
};
