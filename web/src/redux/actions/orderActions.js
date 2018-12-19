// import storage from '../../services/firebaseConfig';

export const removeOrder = id => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const dataAll = firestore.collection('orders').doc(id);

		dataAll
			.delete()
			.then(res => {
				firestore.onSnapshot('orders');
				dispatch({ type: 'REMOVE_ORDER', id });
			})
			.catch(error => {
				console.error('Error removing document: ', error);
				dispatch({ type: 'REMOVE_ERROR', error });
			});
	};
};

export const keepDataInLocalState = order => {
	return (dispatch, getState) => {
		dispatch({ type: 'ADD_DATA', order });
	};
};

export const DeleteDataStep = order => {
	return (dispatch, getState) => {
		dispatch({ type: 'DELETE_DATA', order });
	};
};

export const createOrder = (order, picture) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to database
		const firestore = getFirestore();
		// const profile = getState().firebase.profile;
		const userId = getState().firebase.auth.uid;
		const lokasi = {
			alamat: order.address,
			catatan: 'catatan',
			latLng: 123131
		};
		const logs = {
			data: {
				createdAt: new Date()
			},
			name: order.name,
			phone: order.phone,
			userId: userId,
			status: 'WAITING_CONFIRMATION'
		};

		console.log(order.downloadURLs, logs, lokasi);

		firestore
			.collection('orders')
			.add({
				location: lokasi,
				foto: order.downloadURLs,
				logs: logs
			})
			.then(() => {
				dispatch({ type: 'CREATE_ORDER', order });
			})
			.catch(err => {
				dispatch({ type: 'CREATE_ORDER_ERROR', err });
			});
	};
};
