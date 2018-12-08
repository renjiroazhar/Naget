export const editProfile = (userdata, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('users')
			.doc(id)
			.set({
				name: userdata.name,
				address: userdata.address,
				phone: userdata.phone
			})
			.then(() => {
				dispatch({ type: 'EDIT_SUCCESS', userdata });
			})
			.catch(err => {
				dispatch({ type: 'EDIT_ERROR', err });
			});
	};
};

export const changePassword = (currentPassword, newPassword) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		var user = firebase.auth().currentUser;
		var cred = firebase.auth.EmailAuthProvider.credential(
			user.email,
			currentPassword
		);
		return user
			.reauthenticateWithCredential(cred)
			.then(() => {
				var user = firebase.auth().currentUser;
				user
					.updatePassword(newPassword)
					.then(() => {
						console.log('Password was changed');
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};
};
