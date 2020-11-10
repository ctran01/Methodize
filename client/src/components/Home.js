import React, { useContext } from "react";
import UserContext from "../context/UserContext";
const Home = () => {
  const { setAuth, setEmail, setUserId } = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAuth(null);
    setEmail(null);
    setUserId(null);
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
