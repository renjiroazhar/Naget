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
				editError: 'Edit Profile Failed'
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
				changePassErr: 'Change Password Error'
			};
		case 'RESET_PASSWORD_SUCCESS':
			console.log('Change Password Success');
			return {
				...state,
				resetErr: null
			};
		case 'RESET_PASSWORD_ERROR':
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
