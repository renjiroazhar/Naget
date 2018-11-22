export const removeOrder = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {      
        const firestore = getFirestore();
        const dataAll = firestore.collection('orders').doc(id);
        
        dataAll.delete().then(() => {
            dispatch({ type: 'REMOVE_ORDER', id });
            firestore.onSnapshot('orders'); 
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
    }
};


export const createOrder = (order) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // Make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid
        firestore.collection('orders').add({
            ...order,
            name: profile.name,
            phone: profile.phone,
            userId: userId,
            createdAt: new Date()
         }).then(() => {
           
        dispatch({ type: 'CREATE_ORDER', order }) 
         }).catch((err) => {
            dispatch({ type: 'CREATE_ORDER_ERROR', err });
         })
    }
}
