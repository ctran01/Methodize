const Reducer = (state, action) => {
  switch (action.type) {
    case "get_user_tasks":
      return { ...state, tasks: action.payload };
    case "update_task":
      return { ...state, tasks: action.payload };
    case "get_selected_task":
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
};

export default Reducer;
