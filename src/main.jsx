import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./assets/styles/global.css";

import { RegistroProvider } from "./context/RegistroContext";

import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <BrowserRouter>

            <RegistroProvider>
                <App />
            </RegistroProvider>

        </BrowserRouter>

    </React.StrictMode>
);