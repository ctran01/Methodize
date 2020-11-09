import createDataContext from "./createDataContext";
import apiServer from "../config/apiServer";
import { Redirect } from "react-router-dom";

//Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      const { token, email, auth, userid } = action.payload;
      return {
        auth: auth,
        token: token,
        userid: userid,
        email: email,
      };

    default:
      return state;
  }
};

//Action
const login = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const res = await apiServer.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data.id);
      dispatch({
        type: "login",
        payload: {
          auth: res.data.token,
          email: res.data.email,
          userid: res.data.id,
          token: res.data.token,
        },
      });
    } catch (err) {
      console.log(err.status);
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const res = await apiServer.post("/register", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("id", res.data.id);
      dispatch({
        type: "login",
        payload: {
          auth: res.data.token,
          email: res.data.email,
          userid: res.data.id,
          token: res.data.token,
        },
      });
      return <Redirect to="/register/onboard" />;
    } catch (err) {
      console.log(err.status);
    }
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { login, signup },
  { auth: null, token: null, email: null, userid: null }
);
