import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/TaskReducer";

const initialState = {
  tasks: [],
};

const TaskStore = ({ children }) => {
  const [taskState, taskdispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[taskState, taskdispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default TaskStore;
