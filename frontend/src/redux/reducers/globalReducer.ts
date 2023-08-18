import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'globalState',
  initialState: {
    isLogin: false,
    taskData: {},
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setTaskData: (state, action) => {
      state.taskData = action.payload;
    }
  }
});

export const { setIsLogin, setTaskData } = globalSlice.actions;
export default globalSlice.reducer;
