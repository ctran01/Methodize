import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/TasklistReducer";

const initialState = {
  tasklists: [],
};

const TasklistStore = ({ children }) => {
  const [tasklistState, tasklistdispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[tasklistState, tasklistdispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default TasklistStore;
