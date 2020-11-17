import createDataContext from "./createDataContext";

const teamReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(teamReducer, {}, []);
