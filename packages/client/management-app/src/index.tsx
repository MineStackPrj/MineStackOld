import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import { indexReducer } from './reducers';
import reportWebVitals from './reportWebVitals';

// Material-UIテーマカスタマイズ
const theme = createMuiTheme({
  palette: {
    type     : 'dark',
    primary  : teal,
    secondary: green
  },
  typography: {
    fontSize: 14
  }
});

// ReduxのStoreを生成
const store = configureStore({ reducer: indexReducer });

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type AppDispatch = typeof store.dispatch;
