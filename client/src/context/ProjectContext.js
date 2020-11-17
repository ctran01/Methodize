import createDataContext from "./createDataContext";

const projectReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(projectReducer, {}, {});
