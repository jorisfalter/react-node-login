import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"; // Default to localhost for development

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      // const response = await axios.post("http://localhost:3001/login", {
      const response = await axios.post(
        "https://react-node-login.onrender.com/login",
        {
          username,
          password,
        }
      );
      setUser(response.data.token);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      // await axios.post("http://localhost:3001/register", {
      await axios.post("https://react-node-login.onrender.com/register", {
        username,
        password,
      });
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
