import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  success: false,
  errorForgetPwd: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem('admin', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      localStorage.removeItem('admin');
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadUserFromLocalStorage: (state) => {
      const storedUser = localStorage.getItem('admin');
      if (storedUser) {
        state.isAuthenticated = true;
        state.user = JSON.parse(storedUser);
      }
    },
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.errorForgetPwd = false;
      state.success = false;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
      state.errorForgetPwd = false;
      state.success = true;
    },
    forgetPasswordFailure: (state) => {
      state.loading = false;
      state.success = false;
      state.errorForgetPwd = true;
    },
  },
});

export const { 
  loginRequest, loginSuccess, loginFailure, 
  logoutRequest, logoutSuccess, logoutFailure, 
  loadUserFromLocalStorage,
  forgetPasswordFailure, forgetPasswordSuccess, forgetPasswordRequest
} = authSlice.actions;
export default authSlice.reducer;