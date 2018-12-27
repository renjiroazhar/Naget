// import storage from '../../services/firebaseConfig';
import { format } from "date-fns/esm";

export const removeOrder = idItem => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("orders")
      .doc(idItem)
      .delete()
      .then(function(res) {
        console.log("Document successfully deleted!");
        dispatch({ type: "REMOVE_ORDER", res });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
        dispatch({ type: "REMOVE_ERROR", error });
      });
  };
};

export const keepDataInLocalState = order => {
  return (dispatch, getState) => {
    dispatch({ type: "ADD_DATA", order });
  };
};

export const DeleteDataStep = order => {
  return (dispatch, getState) => {
    dispatch({ type: "DELETE_DATA", order });
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
      action: "ORDER_CREATED",
      tanggalPenjemputan: format(order.selectedDate, "dd/MM/yyyy"),
      jamPenjemputan: format(order.selectedDate, "HH:mm")
    };
    const user = {
      name: order.name,
      phone: order.phone,
      userId: userId,
      email: order.email
    };
    const spreadLogs = [{ ...logs }];

    firestore
      .collection("orders")
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        location: lokasi,
        photos: order.downloadURLs,
        logs: spreadLogs,
        user: user,
        status: "WAITING_CONFIRMATION",
        userId: userId,
        orderDate: order.selectedDate
      })
      .then(() => {
        dispatch({ type: "CREATE_ORDER", order });
        console.log(spreadLogs);
      })
      .catch(err => {
        dispatch({ type: "CREATE_ORDER_ERROR", err });
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
      action: "ORDER_CREATED",
      tanggalPenjemputan: format(order.selectedDate, "dd/MM/yyyy"),
      jamPenjemputan: format(order.selectedDate, "HH:mm")
    };
    const user = {
      name: order.name,
      phone: order.phone,
      email: order.email
    };

    firestore
      .collection("orders")
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        location: lokasi,
        photos: order.downloadURLs,
        logs: logs,
        user: user,
        status: "WAITING_CONFIRMATION",
        orderDate: order.selectedDate
      })
      .then(() => {
        dispatch({ type: "CREATE_ORDER", order });
      })
      .catch(err => {
        dispatch({ type: "CREATE_ORDER_ERROR", err });
      });
  };
};
