import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: localStorage.getItem('isLogin') === 'true',
  isCardModalOpen: false,
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem('isLogin', action.payload);
    },
    setIsCardModalOpen: (state, action) => {
      state.isCardModalOpen = action.payload;
    }
  }
});

export const { setIsLogin, setIsCardModalOpen } = globalSlice.actions;
export default globalSlice.reducer;
