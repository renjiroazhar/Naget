const initState = {
  areas: [],
  messageAlert: null
};

const areasReducers = (state = initState, action) => {
  switch (action.type) {
    case "ADD_AREA":
      console.log("Add Area", action.area);
      return {
        ...state,
        messageAlert: "Add Area Success"
      };
    case "DELETE_ITEM":
      return (state, action) => ({
        ...state,
        areas: state.areas.filter(area => action.payload !== area)
      });
    case "ADD_AREA_ERROR":
      console.log("Add Area Error", action.err);
      return {
        ...state,
        messageAlert: "Add Area Failed, error"
      };
    case "BACK_STATE":
      console.log("Back To Initial State");
      return {
        ...state,
        areas: [],
        messageAlert: null
      };
    default:
      return state;
  }
};

export default areasReducers;
