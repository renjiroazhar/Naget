import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import * as serviceWorker from './service-worker';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';

const browserHistory = createBrowserHistory();

const Main = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

ReactDOM.render(
  <Provider>
    <Router history={browserHistory}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
