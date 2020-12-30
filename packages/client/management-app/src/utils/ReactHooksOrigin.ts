import { TypedUseSelectorHook, useSelector as rawUseSelector } from 'react-redux';

import { IndexReducerType } from '@/reducers';

// 型情報付きのuseSelectorをここで宣言
// eslint-disable-next-line import/prefer-default-export
export const useSelector: TypedUseSelectorHook<IndexReducerType> = rawUseSelector;
