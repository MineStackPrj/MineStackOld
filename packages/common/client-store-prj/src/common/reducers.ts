/**
 * @file reducers.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice';

/**
 * 作成されたReducerをまとめて1つのReducerにする
 */
export const indexReducer = combineReducers({
  user: userReducer
});

export type IndexReducerType = ReturnType<typeof indexReducer>;
