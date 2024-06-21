import React from "react";
import { insertUser } from "../app.js";
import "./RegFields.css";

const LoginFields = () => {
  return (
    <React.StrictMode>
      <div id="reg_fields">
        <div id="text">
          <h1>Create an account</h1>
        </div>

        <input
          type="text"
          id="fname"
          className="input"
          placeholder="First name"
        />
        <br />

        <input
          type="text"
          id="lname"
          className="input"
          placeholder="Last name"
        />
        <br />
        <input
          type="text"
          id="username"
          className="input"
          placeholder="Username"
        />
        <br />

        <input type="email" id="email" className="input" placeholder="Email" />
        <br />

        <input
          type="password"
          id="pass"
          className="input"
          placeholder="Password"
        />
        <br />
        <button onClick={insertUser}>Create account</button>
      </div>
    </React.StrictMode>
  );
};

export default LoginFields;
