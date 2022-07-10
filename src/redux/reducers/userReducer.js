const initState = {
  check: false,
  authenticated: false,
  name: "",
  email: "",
  top10songs: [],
  top10artists: [],
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        check: true,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...initState,
        check: true,
      };
    case "SET_USER_CHECK":
      return { ...state, check: true };
    case "SET_TOP_10_SONGS":
      return { ...state, top10songs: action.payload };
    case "SET_TOP_10_ARTISTS":
      return { ...state, top10artists: action.payload };
    default:
      return { ...state };
  }
};
export default userReducer;
