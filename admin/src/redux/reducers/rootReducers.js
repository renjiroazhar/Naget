import authReducers from "./authReducers";
import orderReducers from "./orderReducers";
import profileReducers from "./profileReducers";
import areasReducers from "./areasReducers";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducers = combineReducers({
  auth: authReducers,
  order: orderReducers,
  userprofile: profileReducers,
  areas: areasReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducers;
