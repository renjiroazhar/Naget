const initState = {
  editError: null,
  resetErr: null,
  changePassErr: null,
  changePassErrMessage: null,
  succesMessage: null
};

const profileReducers = (state = initState, action) => {
  switch (action.type) {
    case "EDIT_SUCCESS":
      console.log("Edit Profile Success");
      return {
        ...state,
        editError: null
      };
    case "EDIT_ERROR":
      console.log("Edit Profile Failed");
      return {
        ...state,
        editError: "Edit Profile Failed"
      };
    case "CHANGE_PASSWORD_SUCCESS":
      console.log("Change Password Success");
      return {
        ...state,
        changePassErr: null,
        succesMessage: "Change Password Success"
      };
    case "CHANGE_PASSWORD_ERROR":
      console.log(action.err.message);
      return {
        ...state,
        changePassErr: true,
        changePassErrMessage: action.err.message
      };
    case "NOTHING_HAPPEN":
      return {
        ...state,
        editError: null,
        resetErr: null,
        changePassErr: null,
        changePassErrMessage: null,
        succesMessage: null
      };
    case "RESET_PASSWORD_SUCCESS":
      console.log("Change Password Success");
      return {
        ...state,
        resetErr: null
      };
    case "RESET_PASSWORD_ERROR":
      console.log(action.error.message);
      return {
        ...state,
        resetErr: action.error.message
      };
    default:
      return state;
  }
};

export default profileReducers;
