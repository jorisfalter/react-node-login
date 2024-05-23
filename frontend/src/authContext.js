import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      setUser(response.data.token);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post("http://localhost:4000/register", {
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
