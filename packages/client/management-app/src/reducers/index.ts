import { combineReducers } from '@reduxjs/toolkit';

import backdropReducer from './BackdropReducers';
import userAuthInfoReducer from './UserAuthInfoReducers';

/**
 * 作成されたReducerをまとめて1つのReducerにする
 */
export const indexReducer = combineReducers({
  auth    : userAuthInfoReducer,
  backdrop: backdropReducer
});

export type IndexReducerType = ReturnType<typeof indexReducer>;
