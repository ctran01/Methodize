import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import TopNavBar from "../NavigationBar/TopNavBar";

const MainContent = ({ showSidebar, sidebar }) => {
  const { setAuth, setEmail, setUserId } = useContext(AuthContext);

  return (
    <div style={{}}>
      <div style={{ marginLeft: "50px" }}>MainContent</div>
    </div>
  );
};

export default MainContent;
