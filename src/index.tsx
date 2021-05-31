import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './app/context/auth-context';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/main.scss';

ReactDOM.render(
    <AuthContextProvider>
        <App/>
    </AuthContextProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
