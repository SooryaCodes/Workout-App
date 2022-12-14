import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WorkoutProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </WorkoutProvider>
);
