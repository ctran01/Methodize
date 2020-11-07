import createDataContext from "./createDataContext";
import apiServer from "../config/apiServer";

//Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

//Action
const login = (dispatch) => {
  return async ({ email, password }) => {
    try {
      // const res = await apiServer.post("/login", { email, password });
      // console.log(res);
      console.log(email);
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { login },
  { auth: null, token: null, email: null, userid: null }
);
