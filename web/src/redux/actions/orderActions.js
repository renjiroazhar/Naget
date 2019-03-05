import { format } from 'date-fns/esm';

export const cancelOrder = (orderdata, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		const logs = {
			action: 'ORDER_CANCELED_BY_USER',
			date: new Date()
		};
		const spreadLogs = [...orderdata.logs, { ...logs }];
		const today = new Date();
		firestore
			.collection('orders')
			.doc(id)
			.set({
				createdAt: orderdata.createdAt,
				updatedAt: today,
				location: orderdata.location,
				user: orderdata.user,
				logs: spreadLogs,
				orderDate: orderdata.orderDate,
				photos: orderdata.photos,
				status: 'CANCELED_BY_USER',
				userId: orderdata.userId
			})
			.then(() => {
				dispatch({ type: 'CANCEL_ORDER_SUCCESS', orderdata });
			})
			.catch(err => {
				dispatch({ type: 'CANCEL_ORDER_ERROR', err });
			});
	};
};

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
				// dispatch({ type: 'REMOVE_ORDER_ERROR', error });
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
			action: 'ORDER_CREATED',
			tanggalPenjemputan: format(order.selectedDate, 'dd/MM/yyyy'),
			jamPenjemputan: format(order.selectedDate, 'HH:mm')
		};
		const user = {
			name: order.name,
			phone: order.phone,
			userId: userId,
			email: order.email
		};
		const spreadLogs = [{ ...logs }];

		firestore
			.collection('orders')
			.add({
				createdAt: firestore.FieldValue.serverTimestamp(),
				location: lokasi,
				photos: order.downloadURLs,
				logs: spreadLogs,
				user: user,
				status: 'WAITING_CONFIRMATION',
				userId: userId,
				orderDate: order.selectedDate
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
			action: 'ORDER_CREATED',
			tanggalPenjemputan: format(order.selectedDate, 'dd/MM/yyyy'),
			jamPenjemputan: format(order.selectedDate, 'HH:mm')
		};
		const user = {
			name: order.name,
			phone: order.phone,
			email: order.email
		};
		const spreadLogs = [{ ...logs }];

		firestore
			.collection('orders')
			.add({
				createdAt: firestore.FieldValue.serverTimestamp(),
				location: lokasi,
				photos: order.downloadURLs,
				logs: spreadLogs,
				user: user,
				status: 'WAITING_CONFIRMATION',
				orderDate: order.selectedDate
			})
			.then(() => {
				dispatch({ type: 'CREATE_ORDER', order });
			})
			.catch(err => {
				// dispatch({ type: 'CREATE_ORDER_ERROR', err });
				console.log(err);
			});
	};
};
