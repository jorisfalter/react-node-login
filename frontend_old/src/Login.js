import React, { useState, useContext } from "react";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernamelogin, setUsernamelogin] = useState("");
  const [passwordlogin, setPasswordlogin] = useState("");
  const [usernameregister, setUsernameregister] = useState("");
  const [passwordregister, setPasswordregister] = useState("");
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameLoginChange = (event) => {
    setUsernamelogin(event.target.value);
  };

  const handlePasswordLoginChange = (event) => {
    setPasswordlogin(event.target.value);
  };

  const handleUsernameRegisterChange = (event) => {
    setUsernameregister(event.target.value);
  };

  const handlePasswordRegisterChange = (event) => {
    setPasswordregister(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    await login(usernamelogin, passwordlogin);
    navigate("/"); // Redirect to Home after login
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    register(usernameregister, passwordregister);
    navigate("/"); // Redirect to Home after registration
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <form
          onSubmit={handleLoginSubmit}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={usernamelogin}
              onChange={handleUsernameLoginChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={passwordlogin}
              onChange={handlePasswordLoginChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <form
          onSubmit={handleRegisterSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            marginTop: "20px",
          }}
        >
          <h2>Register</h2>
          <label>
            Username:
            <input
              type="text"
              value={usernameregister}
              onChange={handleUsernameRegisterChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={passwordregister}
              onChange={handlePasswordRegisterChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
