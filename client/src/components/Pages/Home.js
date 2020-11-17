import React, { useContext, useEffect, useState } from "react";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import "../../css/Home.css";
import { Context as UserContext } from "../../context/store/UserStore";
const Home = () => {
  const { getUserInfo } = useContext(UserContext);

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <>
      <TopNavBarHome />
      <section style={{ margin: "20px 120px" }}>
        <div
          className="home-container"
          style={{ width: "900px", margin: "0 auto" }}
        >
          {/* <div className="home-welcome-header">Welcome [name]!</div> */}
          <div className="home-tasks-container">
            <div className="home-tasks-header">
              <h2>Tasks Due Soon</h2>
              <p>See all my tasks</p>
            </div>
            <ul className="home-tasks--list">
              {/* call get all tasks for specific user route */}
            </ul>
          </div>
          <div className="home-projects-container">
            <div className="home-projects-header">
              <h2>Projects</h2>
            </div>
            <ul className="home-projects--list">
              {/* call get all projects for specific user route */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
