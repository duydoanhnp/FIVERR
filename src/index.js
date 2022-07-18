import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';

import {store} from './redux/configStore';
import './assets/scss/index.scss';
import './index.css';
import './scss/index.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
