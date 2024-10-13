import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser, addProfilePhoto } from '../services/profileService';

const initialState = {
  user: [],
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Profile photo added successfully!';
      })
      .addCase(addProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
