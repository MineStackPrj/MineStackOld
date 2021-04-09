/**
 * @file userSlice.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { createSlice } from '@reduxjs/toolkit';

export interface IUserInfo {
   userId: string,
   userName: string,
   email: string,
 }

const initialUserInfo: IUserInfo = {
  userId  : '',
  userName: '',
  email   : ''
};

const userInitialSlice = createSlice({
  name        : 'user',
  initialState: {
    userInfo    : initialUserInfo,
    signInStatus: 'initial'
  },
  reducers: {
  }
});

const userSignInSlice = createSlice({
  name        : 'user',
  initialState: {
    userInfo    : initialUserInfo,
    signInStatus: 'signIn'
  },
  reducers: {
  }
});

export const userReducer = userInitialSlice.reducer;
export const userInitialReducer = userInitialSlice.reducer;
export const userSignInReducer = userSignInSlice.reducer;

