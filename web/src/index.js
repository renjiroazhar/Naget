import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducers from './redux/reducers/rootReducers';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './services/firebaseConfig';
import { Router } from 'react-router-dom';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const store = createStore(
	rootReducers,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebaseConfig),
		reactReduxFirebase(firebaseConfig, {
			useFirestoreForProfile: true,
			userProfile: 'users',
			attachAuthIsReady: true
		})
	)
);

const history = createBrowserHistory();

store.firebaseAuthIsReady.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root')
	);
	serviceWorker.unregister();
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
