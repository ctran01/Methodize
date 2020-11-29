const Reducer = (state, action) => {
  switch (action.type) {
    case "get_user_projects":
      return { ...state, projects: action.payload };
    case "get_project":
      return { ...state, userProject: action.payload };
    default:
      return state;
  }
};

export default Reducer;
