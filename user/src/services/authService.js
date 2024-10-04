import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from './api.js';

export const signupReducer = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    console.log('heyy')
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
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Network error, please try again!');
    }
  }
);