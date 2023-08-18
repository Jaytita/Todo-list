import { createSlice } from '@reduxjs/toolkit';

const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState: {
    visible: false
  },
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    }
  }
});

export const { setVisible } = cardModalSlice.actions;
export default cardModalSlice.reducer;
