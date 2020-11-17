import React, { useContext, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "../../css/Navbar.css";
import { RiMenuFoldLine, RiMenuFill } from "react-icons/ri";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import { Context as TeamContext } from "../../context/store/TeamStore";

const LeftNavBar = ({ showSidebar, sidebar }) => {
  // const [teams, setTeams] = useState([]);
  const [teamState, teamdispatch] = useContext(TeamContext);
  const [loading, setLoading] = useState(true);
  //NOTE : Only other option that worked was setting state either in here or in App.js and call it for global state. ReducerContext does not work
  const getTeams = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/team/user/${id}`);
    await teamdispatch({ type: "get_user_teams", payload: res.data[0].Teams });
    // setTeams(res.data[0].Teams);
    setLoading(false);
  };

  useEffect(() => {
    getTeams();
  }, []);

  // if (loading) return <Loader />;
  const renderedList = teamState.teams.map((team) => {
    return <li>{team.name}</li>;
  });
  return (
    <div className="left-nav-bar-container">
      <div className={sidebar ? "nav-menu active" : "nav-menu collapsed"}>
        <div className="left-nav-menu-container">
          <div
            className="left-nav-menu-top"
            style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}
          >
            <div className="logo" style={{ color: "white" }}>
              Logo Here
            </div>
            <div className="collapse-menu-icon-container">
              <RiMenuFoldLine
                style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
                onClick={showSidebar}
              />
            </div>
          </div>

          <div
            className="main-menu-items-container"
            style={{ marginTop: "10px" }}
          >
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/tasks">
              <button>My Tasks</button>
            </Link>
          </div>
          <div className="favorites-container">
            <p style={{}}>Favorites</p>

            <li>Favorite 1</li>
            <li>Favorite 2</li>
          </div>
          <div className="teams-items-container">
            <div className="teams-items-header" style={{ display: "flex" }}>
              <p style={{}}>Teams</p>
              <p style={{ marginLeft: "140px", cursor: "pointer" }}>+</p>
            </div>
            {teamState.teams ? renderedList : <div>Loading...</div>}
          </div>
        </div>
      </div>

      {sidebar ? null : (
        <div
          className="menu-icon"
          style={{
            paddingTop: "25px",
            paddingLeft: "20px",
            paddingBottom: "22px",
            backgroundColor: "white",
          }}
        >
          <RiMenuFill
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={showSidebar}
          />
        </div>
      )}
    </div>
  );
};

export default LeftNavBar;
