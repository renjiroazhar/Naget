const initState = {
	editError: null,
	resetErr: null,
	changePassErr: null
};

const profileReducers = (state = initState, action) => {
	switch (action.type) {
		case 'EDIT_SUCCESS':
			console.log('Edit Profile Success');
			return {
				...state,
				editError: null
			};
		case 'EDIT_ERROR':
			console.log('Edit Profile Failed');
			return {
				...state,
				editError: action.err.message
			};
		case 'CHANGE_PASSWORD_SUCCESS':
			console.log('Change Password Success');
			return {
				...state,
				changePassErr: null
			};
		case 'CHANGE_PASSWORD_ERROR':
			console.log('Change Password Error');
			return {
				...state,
				changePassErr: action.err.message
			};
		case 'RESET_PASSWORD_SUCCESS':
			console.log('Change Password Success');
			return {
				...state,
				resetErr: null
			};
		case 'RESET_PASSWORD_ERROR':
			console.log('Change Password Error');
			return {
				...state,
				resetErr: action.err.message
			};
		default:
			return state;
	}
};

export default profileReducers;
