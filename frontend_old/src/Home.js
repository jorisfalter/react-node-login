import React, { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
};

export default Home;
