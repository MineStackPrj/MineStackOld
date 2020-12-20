import { combineReducers } from '@reduxjs/toolkit';

/**
 * 作成されたReducerをまとめて1つのReducerにする
 */
export const indexReducer = combineReducers({
});

export type IndexReducerType = ReturnType<typeof indexReducer>;
