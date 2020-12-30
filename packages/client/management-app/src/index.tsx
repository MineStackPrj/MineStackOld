import './index.scss';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { getLocalStorage } from '@actions/LocalStorage';
import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { indexReducer } from '@reducers/reducers';
import { setUser } from '@reducers/UserAuthInfoReducers';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';

// Material-UIテーマカスタマイズ
const theme = createMuiTheme({
  palette: {
    type     : 'light', // light or dark
    primary  : teal, // primaryのカラー
    secondary: green // secondaryのカラー
  },
  typography: {
    fontSize: 14
  }
});

// ReduxのStoreを生成
const store = configureStore({ reducer: indexReducer });

// LocalStorageからログイン情報を持ってきて、ReduxStoreにDispatch
const userInfo = getLocalStorage('UserInfo') ?? { isAuth: false, jwtToken: '' };
store.dispatch(setUser(userInfo));

// Axios設定
axios.defaults.baseURL = 'http://localhost:4500/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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

export type AppDispatch = typeof store.dispatch;
