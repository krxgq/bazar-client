import React from "react";
import { login } from "../app.js";
import "./LoginFields.css";

const LoginFields = () => {
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
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          id="pass"
          placeholder="Password"
          autoComplete="on"
        />
        <br />
        <button onClick={login}>Continue</button>
      </div>
    </React.StrictMode>
  );
};

export default LoginFields;
