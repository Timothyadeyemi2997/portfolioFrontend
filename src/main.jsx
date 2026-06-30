import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./shared/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster 
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          background: "#081620",
          color: "#fff",
          border: "1px solid #22c55e",
          borderRadius: "12px",
        },
      }}
      />
    </AuthProvider>
  </BrowserRouter>
);