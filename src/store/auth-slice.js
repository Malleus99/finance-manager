import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialLoggedStatus = initialToken ? true : false;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isLoggedIn: initialLoggedStatus,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', state.token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
