import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { SearchProvider } from "./SearchContext";
import { AlertProvider } from "./AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <SearchProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </SearchProvider>
    </HashRouter>
  </React.StrictMode>
);