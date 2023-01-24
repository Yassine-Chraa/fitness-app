import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { MaterialUIControllerProvider } from "./dashboardContext";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./apiContext/Context/ProductContext";

if (document.getElementById("dashboard")) {
    const root = ReactDOM.createRoot(document.getElementById("dashboard"));

    root.render(
        <ProductContextProvider>
            <BrowserRouter>
                <MaterialUIControllerProvider>
                    <App />
                </MaterialUIControllerProvider>
            </BrowserRouter>
        </ProductContextProvider>
    );
}
