// import storage from '../../services/firebaseConfig';
import { format } from 'date-fns/esm';

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
			catatan: order.catatan,
			latLng: 123131
		};
		const logs = {
			action: 'ORDER_CREATED'
		};
		const user = {
			name: order.name,
			phone: order.phone,
			userId: userId,
			email: order.email
		};
		const date = new Date();

		firestore
			.collection('orders')
			.add({
				createdAt: date,
				location: lokasi,
				photos: order.downloadURLs,
				logs: logs,
				user: user,
				status: 'WAITING_CONFIRMATION',
				userId: userId,
				tanggalPenjemputan: format(order.selectedDate, 'dd/MM/yyyy'),
				jamPenjemputan: format(order.time, 'HH:mm')
			})
			.then(() => {
				dispatch({ type: 'CREATE_ORDER', order });
			})
			.catch(err => {
				dispatch({ type: 'CREATE_ORDER_ERROR', err });
			});
	};
};

export const createOrderWithoutLogin = (order, picture) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to database
		const firestore = getFirestore();

		const lokasi = {
			alamat: order.address,
			catatan: order.catatan,
			latLng: 123131
		};
		const logs = {
			action: 'ORDER_CREATED'
		};
		const user = {
			name: order.name,
			phone: order.phone,
			email: order.email
		};
		const date = new Date();

		firestore
			.collection('orders')
			.add({
				createdAt: date,
				location: lokasi,
				photos: order.downloadURLs,
				logs: logs,
				user: user,
				status: 'WAITING_CONFIRMATION',
				tanggalPenjemputan: format(order.selectedDate, 'dd/MM/yyyy'),
				jamPenjemputan: format(order.time, 'HH:mm')
			})
			.then(() => {
				dispatch({ type: 'CREATE_ORDER', order });
			})
			.catch(err => {
				dispatch({ type: 'CREATE_ORDER_ERROR', err });
			});
	};
};
