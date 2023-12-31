import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './routes';

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'
import './styles/copy.css'

import { Provider } from 'react-redux';
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
