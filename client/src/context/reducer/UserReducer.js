const Reducer = (state, action) => {
  switch (action.type) {
    case "get_user_info":
      return { user: action.payload };

    default:
      return state;
  }
};

export default Reducer;
