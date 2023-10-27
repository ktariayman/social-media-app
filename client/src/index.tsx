import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/icons/icons.css';
import App from './App';
import "./styles/dark.css";

import { Provider } from 'react-redux';
import { persistor, store } from './reducers';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
