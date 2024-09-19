import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
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
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('admin');
    },
    loadUserFromLocalStorage: (state) => {
      const storedUser = localStorage.getItem('admin');
      if (storedUser) {
        state.isAuthenticated = true;
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, loadUserFromLocalStorage } = authSlice.actions;

export const loginAdmin = (loginData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(
      'http://localhost:3000/',
      loginData,
      { withCredentials: true, }
    );
    if (response.data.user.account_type === 'admin') {
      dispatch(loginSuccess(response.data.user));
    } else {
      dispatch(loginFailure('Unauthorized access'));
    }
  } catch (error) {
    dispatch(loginFailure(error.response ? error.response.data.message : 'Network error'));
  }
};

export default authSlice.reducer;