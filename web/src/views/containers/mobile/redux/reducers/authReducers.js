const initState = {
	authError: null,
	redirect: null,
	redirectSignup: null,
	errMessage: null,
	signupError: null
};

const authReducers = (state = initState, action) => {
	switch (action.type) {
		case 'LOGIN_ERROR':
			console.log('Login Error', action.err.message);
			return {
				...state,
				authError: action.err.message
			};
		case 'LOGIN_SUCCESS': {
			console.log('Login Success');
			return {
				...state,
				authError: null,
				redirect: true
			};
		}
		case 'GOOGLE_LOGIN_ERROR':
			console.log('Login Error');
			return {
				...state,
				authError: 'Login Failed'
			};
		case 'GOOGLE_LOGIN_SUCCESS': {
			console.log('Login Success');
			return {
				...state,
				authError: null,
				redirect: true
			};
		}
		case 'FACEBOOK_LOGIN_ERROR':
			console.log('Login Error');
			return {
				...state,
				authError: 'Login Failed'
			};
		case 'FACEBOOK_LOGIN_SUCCESS': {
			console.log('Login Success');
			return {
				...state,
				authError: null,
				redirect: true
			};
		}
		case 'SIGNUP_SUCCESS':
			console.log('SignUp Success');
			return {
				...state,
				authError: null,
				redirect: true
			};
		case 'SIGNUP_ERROR':
			console.log('Sign Up Error');
			return {
				...state,
				signupError: action.err.message
			};
		case 'SIGNOUT_SUCCESS':
			console.log('Logout Success');
			return {
				...state,
				redirect: null
			};

		default:
			return state;
	}
};

export default authReducers;
