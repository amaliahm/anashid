import { createSlice } from '@reduxjs/toolkit';

import { fetchArtists, addArtist, deleteArtist } from '../services/artistsService';

const initialState = {
  artists: [],
  loading: false,
  error: null,
  successMessage: null,
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artists.push(action.payload);
        state.successMessage = 'Artist added successfully!';
      })
      .addCase(addArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(deleteArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = state.artists.filter((artist) => artist.id !== action.payload);
        state.successMessage = 'Artist deleted successfully!'; 
      })
      .addCase(deleteArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default artistSlice.reducer;
