import { provider } from "../../services/firebaseConfig";
import { facebookProvider } from "../../services/firebaseConfig";

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
        setTimeout(() => {
          dispatch({ type: "RESET_LOGIN_ERROR" });
        }, 5000);
      });
  };
};

export const signUp = credentials => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            name: credentials.name,
            phone: credentials.phone,
            address: credentials.address
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const addNewAdmin = credentials => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(resp => {
        if (resp && resp.emailVerified === false) {
          resp.sendEmailVerification().then(function() {
            console.log("email verification sent to user");
          });
        }
        return firestore
          .collection("admins")
          .doc(resp.user.uid)
          .set({
            name: credentials.name,
            phone: credentials.phone,
            address: credentials.address,
            roles: "admin"
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const signInWithGoogle = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch({ type: "GOOGLE_LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "GOOGLE_LOGIN_ERROR", err });
      });
  };
};

export const signInWithFacebook = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(result => {
        dispatch({ type: "FACEBOOK_LOGIN_SUCCESS" });
        console.log("Akses Token Bruh", result.credential.accessToken);
        console.log("User Id maybe", result.user);
      })

      .catch(err => {
        dispatch({ type: "FACEBOOK_LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
