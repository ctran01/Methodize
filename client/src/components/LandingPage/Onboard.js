import React, { useContext } from "react";
import { Context as UserContext } from "../../context/UserContext";

const Onboard = () => {
  const { onboard } = useContext(UserContext);
  return (
    <div className="onboard-page-container">
      <div>
        <form>
          <label>
            Full Name
            <input></input>
          </label>
          <label>
            Team Name
            <input></input>
          </label>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Onboard;
