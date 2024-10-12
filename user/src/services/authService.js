import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from './api.js';

export const signupReducer = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Network error, please try again!');
    }
  }
);

export const loginReducer = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', loginData, { withCredentials: true });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Network error, please try again!');
    }
  }
);

export const logoutReducer = createAsyncThunk(
  'auth/logout',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/auth/logout/${id}`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Network error, please try again!');
    }
  }
);