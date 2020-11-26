import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/UserReducer";

const initialState = {
  user: [],
};

const UserStore = ({ children }) => {
  const [userState, userdispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[userState, userdispatch]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default UserStore;
