import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./redux/reducers/rootReducers";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./services/firebaseConfig";
import MainApp from "./MainApp";

import "assets/css/material-dashboard-react.css?v=1.5.0";

const hist = createBrowserHistory();

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {
      useFirestoreForProfile: true,
      userProfile: "admins",
      attachAuthIsReady: true
    })
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
        <MainApp />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
