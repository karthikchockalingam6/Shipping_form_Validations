import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RegisterForm from "./components/RegistrationForm";
// import PropPassing from "./components/PropPassing";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterForm />
    {/* <PropPassing /> */}
  </React.StrictMode>
);
