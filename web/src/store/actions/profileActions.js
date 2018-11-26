export const editProfile = (userdata, id) => {
  return (dispatch, getState ,{ getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(id)
      .set({
        name: userdata.name,
        address: userdata.address,
        phone: userdata.phone
      })
      .then(()=> {
        dispatch({ type: "EDIT_SUCCESS", userdata });
      })
      .catch((err) => {
          dispatch({type: "EDIT_ERROR", err})
      });
  };
};
