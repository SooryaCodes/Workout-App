export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "SIGNUP":
      return { user: action.payload };
    default:
      return state;
  }
};
