import authReducers from './authReducers';
import orderReducers from './orderReducers';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducers = combineReducers({
    auth: authReducers,
    order: orderReducers,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducers;