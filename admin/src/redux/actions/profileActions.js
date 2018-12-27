export const editProfile = (userdata, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(id)
      .set({
        name: userdata.name,
        address: userdata.address,
        phone: userdata.phone
      })
      .then(() => {
        dispatch({ type: "EDIT_SUCCESS", userdata });
      })
      .catch(err => {
        dispatch({ type: "EDIT_ERROR", err });
      });
  };
};

export const editProfileAdmin = (userdata, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("admins")
      .doc(id)
      .set({
        name: userdata.name,
        address: userdata.address,
        phone: userdata.phone
      })
      .then(() => {
        dispatch({ type: "EDIT_SUCCESS", userdata });
      })
      .catch(err => {
        dispatch({ type: "EDIT_ERROR", err });
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
          .then(res => {
            console.log("Password was changed", res);
            dispatch({ type: "CHANGE_PASSWORD_SUCCESS" });
            setTimeout(() => {
              dispatch({ type: "NOTHING_HAPPEN" });
            }, 5000);
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: "CHANGE_PASSWORD_ERROR", err });
          });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "CHANGE_PASSWORD_ERROR", err });
        setTimeout(() => {
          dispatch({ type: "NOTHING_HAPPEN" });
        }, 5000);
      });
  };
};

export const resetPassword = emailAddress => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    var auth = firebase.auth();

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        dispatch({ type: "RESET_PASSWORD_SUCCESS" });
        console.log("email sending");
      })
      .catch(error => {
        dispatch({ type: "RESET_PASSWORD_ERROR", error });
      });
  };
};

// .auth().generatePasswordResetLink(email, actionCodeSettings)
//   .then((link) => {
//     // Construct password reset email template, embed the link and send
//     // using custom SMTP server.
//     return sendCustomPasswordResetEmail(email, displayName, link);
//   })
//   .catch((error) => {
//     // Some error occurred.
//   });
