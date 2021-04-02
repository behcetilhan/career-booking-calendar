import React from 'react';
import ReactDOM from 'react-dom';
import './scss/App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AllocatedDateTimeProvider from './store/context';

ReactDOM.render(
  <React.StrictMode>
    <AllocatedDateTimeProvider>
      <App />
    </AllocatedDateTimeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
