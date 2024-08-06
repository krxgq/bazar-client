import React from "react";
import { login } from "../app.js";
import "./LoginFields.css";

const LoginFields = () => {
  const handleButtonClick = () => {
    const inputs = document.querySelectorAll("#login_fields .input");
    let allValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        allValid = false;
      }
    });
    if (allValid) {
      login();
    }
  };

  return (
    <React.StrictMode>
      <div id="login_fields">
        <div id="text">
          <h1>Hello</h1>
          <p>
            sign in or <a href="/reg">create an account</a>
          </p>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          placeholder="Username"
          required
        />
        <br />
        <input
          type="password"
          id="pass"
          className="input"
          placeholder="Password"
          autoComplete="on"
          required
        />
        <br />
        <button onClick={handleButtonClick}>Continue</button>
      </div>
    </React.StrictMode>
  );
};

export default LoginFields;
