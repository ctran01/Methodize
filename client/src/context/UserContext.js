import createDataContext from "./createDataContext";
import apiServer from "../config/apiServer";

//Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "get_user_info":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

//Action
const getUserInfo = (dispatch) => {
  return async () => {
    try {
      const id = localStorage.getItem("userId");
      const res = await apiServer.get(`/user/${id}`);
      dispatch({
        type: "get_user_info",
        payload: res.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { getUserInfo },
  {}
);
