import { createSlice } from '@reduxjs/toolkit';

import { setLocalStorage } from '../actions/LocalStorage';
import { IAuthUserInfo } from '../actions/types/AuthUserInfo';

const initialState: { user: IAuthUserInfo } = {
  user: {
    jwtToken: '',
    isAuth  : false
  }
};

const userAuthInfoSlice = createSlice({
  name    : 'UserAuthInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // ローカルストレージにも上書きしておく
      setLocalStorage('UserInfo', action.payload);
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

export default userAuthInfoSlice.reducer;
export const { setUser } = userAuthInfoSlice.actions;
