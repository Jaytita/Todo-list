import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: localStorage.getItem('isLogin') === 'true',
  isCardModalOpen: false,
  clickedTaskId: 0,
  currentSprint: 1,
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
    },
    setClickedTaskId: (state, action) => {
      state.clickedTaskId = action.payload;
    },
    setCurrentSprint: (state, action) => {
      state.currentSprint = action.payload;
    },
  }
});

export const { setIsLogin, setIsCardModalOpen, setClickedTaskId, setCurrentSprint } = globalSlice.actions;
export default globalSlice.reducer;
