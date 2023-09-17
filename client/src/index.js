import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/Auth";
import { ProductContextProvider } from "./contexts/ProductsContext";
import { CardContextProvider } from "./contexts/CardContext";
import { PopupContextProvider } from "./contexts/PopupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductContextProvider>
    <PopupContextProvider>
      <AuthProvider>
        <CardContextProvider>
          <App />
        </CardContextProvider>
      </AuthProvider>
    </PopupContextProvider>
  </ProductContextProvider>
);
