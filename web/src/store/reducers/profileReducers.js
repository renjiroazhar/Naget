const initState = { 
    editError : null
}


const profileReducers = (state = initState, action) => {
    switch (action.type) {
        case "EDIT_SUCCESS": 
        console.log("Edit Profile Success");
        return {
            ...state,
            editError: null
        }
        case "EDIT_ERROR":
        console.log("Edit Profile Failed");
        return {
            ...state,
            editError: action.err.message
        }
        default:
           return state;
    }
}

export default profileReducers;