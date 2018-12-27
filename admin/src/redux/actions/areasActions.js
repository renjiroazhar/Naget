export const addArea = area => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make async call to database
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    const logs = {
      action: "AREAS_ADDED",
      date: new Date(),
      userId: userId
    };
    const spreadLogs = [{ ...logs }];
    console.log(spreadLogs);
    firestore
      .collection("areas")
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        name: area.name,
        lineGroupId: area.lineId,
        logs: spreadLogs
      })
      .then(() => {
        dispatch({ type: "ADD_AREA", area });
        console.log("Add Area Success");
        setTimeout(() => {
          dispatch({ type: "BACK_STATE" });
        }, 5000);
      })
      .catch(err => {
        dispatch({ type: "ADD_AREA_ERROR", err });
        console.log("Add Area Error");
        setTimeout(() => {
          dispatch({ type: "BACK_STATE" });
        }, 5000);
      });
  };
};
