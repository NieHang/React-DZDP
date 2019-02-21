import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'redux';
import store from './redux/store';
import App from './containers/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
