const Reducer = (state, action) => {
  switch (action.type) {
    case "get_project_tasklists":
      return { ...state, tasklists: action.payload };
    case "update_project_tasklists":
      return { ...state, tasklists: action.payload };
    case "get_selected_tasklist":
      return { ...state, selectedTasklist: action.payload };
    default:
      return state;
  }
};

export default Reducer;
