import React from "react";
import LoginFields from "./components/LoginFields";
import "./LoginReg.css";

const Login = () => {
  return (
    <React.StrictMode>
      <div className="center">
        <LoginFields />
      </div>
    </React.StrictMode>
  );
};

export default Login;
