import React from 'react';
import App from './App';
import './index.css';
import './scss/index.scss';
import './assets/scss/index.scss';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {store} from './redux/configStore';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
