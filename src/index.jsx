import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import store from './store/index.js';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/index.js';

toast.configure({
  position: 'bottom-right',
  autoClose: 2000,
  theme: 'colored',
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
