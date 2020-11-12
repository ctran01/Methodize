import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import TopNavBar from "./TopNavBar";

const MainContent = ({ showSidebar, sidebar }) => {
  const { setAuth, setEmail, setUserId } = useContext(UserContext);

  return (
    <div style={{}}>
      <div style={{ marginLeft: "50px" }}>MainContent</div>
    </div>
  );
};

export default MainContent;
