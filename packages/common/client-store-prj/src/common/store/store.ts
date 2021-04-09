/**
 * @file store.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { indexReducer } from '../reducers';
import { userSignInReducer } from '../slices/userSlice';

export const store = configureStore({
  reducer: indexReducer
});

export const userSignInStore = configureStore({
  reducer: combineReducers({
    user: userSignInReducer
  })
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
