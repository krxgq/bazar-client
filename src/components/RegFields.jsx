import React from "react";
import { insertUser } from "../app.js";
import "./RegFields.css";

const LoginFields = () => {
  const handleButtonClick = () => {
    const inputs = document.querySelectorAll("#reg_fields .input");
    let allValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        allValid = false;
      }
    });
    if (allValid) {
      insertUser();
    }
  };

  return (
    <React.StrictMode>
      <div id="reg_fields">
        <div id="text">
          <h1>Create an account</h1>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>

        <input
          type="text"
          id="fname"
          className="input"
          placeholder="First name"
          required
        />
        <br />

        <input
          type="text"
          id="lname"
          className="input"
          placeholder="Last name"
          required
        />
        <br />
        <input
          type="text"
          id="username"
          className="input"
          placeholder="Username"
          required
        />
        <br />

        <input type="email" id="email" className="input" placeholder="Email" required/>
        <br />

        <input
          type="password"
          id="pass"
          className="input"
          placeholder="Password"
          required
        />
        <br />
        <button onClick={handleButtonClick}>Create account</button>
      </div>
    </React.StrictMode>
  );
};

export default LoginFields;
