import { createSlice } from '@reduxjs/toolkit';

//authSlice.js
import { signupReducer, loginReducer } from '../services/authService.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('token') 
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    errorMessage: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = localStorage.getItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupReducer.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(signupReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(signupReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload;
      });
    builder
      .addCase(loginReducer.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(loginReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
