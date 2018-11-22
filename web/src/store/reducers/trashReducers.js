const initState = {
    authError: null
  };
  
  const trashReducers = (state = initState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        console.log("Login Success");
        return {
          ...state,
          authError: null
        };
      case "LOGIN_ERROR":
        console.log("Login Failed");
        return {
          ...state,
          authError: "Login Failed"
        };
      case "LOGOUT_SUCCESS":
        console.log("Logout Success");
        return state;
      default:
        return state;
    }
  };
  
  export default trashReducers;