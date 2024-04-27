import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextProviders } from "./context/AuthContext.jsx";
import "./index.css";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProviders>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProviders>
    </BrowserRouter>
  </React.StrictMode>
);
