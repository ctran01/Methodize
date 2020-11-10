import createDataContext from "./createDataContext";
import apiServer from "../config/apiServer";

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
        errorMessage: "",
      };
    case "logout":
      return { auth: null, token: null, userid: null, email: null };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_err_message":
      return { ...state, errorMessage: "" };
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
      localStorage.setItem("userid", res.data.id);
      localStorage.setItem("auth", res.data.token);

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
      dispatch({
        type: "add_error",
        payload: "Something went wrong with login",
      });
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const res = await apiServer.post("/register", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userid", res.data.id);
      localStorage.setItem("auth", res.data.token);

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
      dispatch({
        type: "add_error",
        payload: "Something went wrong with registering",
      });
    }
  };
};

const logout = (dispatch) => {
  return async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    dispatch({
      type: "logout",
    });
  };
};

const localSignin = (dispatch) => {
  return async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userid = localStorage.getItem("userid");
    const auth = localStorage.getItem("auth");
    if (token) {
      dispatch({
        type: "signin",
        payload: { token: token, email: email, auth: auth, userid: userid },
      });
    }
  };
};
const onboard = (dispatch) => {
  return async ({ name, email, teamName }) => {
    if (teamName) {
      try {
        const res = await apiServer.put("/register", { name, email, teamName });
      } catch (err) {}
    }
  };
};
const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { login, signup, logout, clearErrorMessage, localSignin },
  { auth: null, token: null, email: null, userid: null, errorMessage: "" }
);
