import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import LeftNavBar from "./LeftNavBar";
import "../../css/Navbar.css";
import MainContent from "./MainContent";
import TopNavBar from "./TopNavBar";
const Home = () => {
  const { setAuth, setEmail, setUserId } = useContext(UserContext);

  //Probably have the toggle nav bar function here
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  console.log({ sidebar });
  return (
    // <div
    //   className="home-page-container"
    //   style={{
    //     height: "100%",
    //     width: "100%",
    //     flexDirection: "column",
    //   }}
    // >
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LeftNavBar showSidebar={showSidebar} sidebar={sidebar} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <TopNavBar showSidebar={showSidebar} sidebar={sidebar} />
        <MainContent />
      </div>
    </div>
    // </div>
  );
};

export default Home;
