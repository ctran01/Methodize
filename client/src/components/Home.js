import React, { useContext } from "react";
import { Context as UserContext } from "../context/UserContext";
const Home = () => {
  const { logout } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
