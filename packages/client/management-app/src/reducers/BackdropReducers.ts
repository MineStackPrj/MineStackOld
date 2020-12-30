import { createSlice } from '@reduxjs/toolkit';

export interface IBackdrop {
  /**
   * ドロワーをオープンするかどうか
   */
  isOpen: boolean;
}

const initialState: { backdrop: IBackdrop } = {
  backdrop: {
    isOpen: false
  }
};

const backdropSlice = createSlice({
  name    : 'Backdrop',
  initialState,
  reducers: {
    setBackdrop: (state, action) => {
      return Object.assign({}, state, { backdrop: action.payload });
    }
  }
});

export default backdropSlice.reducer;
export const { setBackdrop } = backdropSlice.actions;
