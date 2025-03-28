import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    deleteAccount: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    loadUserFromStorage: (state) => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        state.user = userData;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, deleteAccount, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
