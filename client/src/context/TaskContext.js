import createDataContext from "./createDataContext";
import apiServer from "../config/apiServer";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "get_user_tasks":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const getUserTasks = (dispatch) => {
  return async () => {
    const id = localStorage.getItem("userId");
    try {
      const res = await apiServer.get(`/task/user/${id}`);
      dispatch({ type: "get_user_tasks", payload: res.data });
    } catch (err) {
      console.log(err.message);
    }
  };
};
export const { Provider, Context } = createDataContext(
  taskReducer,
  { getUserTasks },
  []
);
