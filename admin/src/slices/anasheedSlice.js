import { createSlice } from '@reduxjs/toolkit';

import { fetchAnasheed, addAnasheed, deleteAnasheed } from '../services/anasheedService';

const initialState = {
  anasheed: [],
  loading: false,
  error: null,
  successMessage: null,
};

const anasheedSlice = createSlice({
  name: 'anasheed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnasheed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnasheed.fulfilled, (state, action) => {
        state.loading = false;
        state.anasheed = action.payload;
      })
      .addCase(fetchAnasheed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnasheed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnasheed.fulfilled, (state, action) => {
        state.loading = false;
        state.anasheed.push(action.payload);
        state.successMessage = 'Anasheed added successfully!';
      })
      .addCase(addAnasheed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(deleteAnasheed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnasheed.fulfilled, (state, action) => {
        state.loading = false;
        state.anasheed = state.anasheed.filter((elem) => elem.id !== action.payload);
        state.successMessage = 'Anasheed deleted successfully!'; 
      })
      .addCase(deleteAnasheed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default anasheedSlice.reducer;
