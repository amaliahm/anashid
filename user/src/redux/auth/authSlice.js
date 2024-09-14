import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupReducer = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', userData);
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
      const response = await axios.post('/auth/login', loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    errorMessage: null,
    successMessage: null,
  },
  reducers: {},
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
      })
      .addCase(signupReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload;
      });

    builder
      .addCase(loginReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
