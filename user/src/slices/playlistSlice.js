import { createSlice } from '@reduxjs/toolkit';
import { fetchPlaylists, addPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist } from '../services/playlistService';

const initialState = {
  playlists: [],
  loading: false,
  error: null,
  success: null,
  added: null
};

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
        state.error = null;
        state.success= 'Playlist fetched successfully'
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.success= null;
        state.error = 'Error, please try again!';
      })
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
        state.error = null;
        state.success= 'Playlist fetched successfully'
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.success= null;
        state.error = 'Error, please try again!';
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter((playlist) => playlist.id !== action.payload);
        state.error = null;
        state.success= 'Playlist deleted successfully'
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.success= null;
        state.error = 'Error, please try again!';
      })
      .addCase(addToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.added = null;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter((playlist) => playlist.id !== action.payload);
        state.error = null;
        state.added= 'Nasheed added successfully'
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.added= null;
        state.error = 'Error, please try again!';
      })
      .addCase(removeFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.added = null;
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter((playlist) => playlist.id !== action.payload);
        state.error = null;
        state.added= 'Nasheed added successfully'
      })
      .addCase(removeFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.added= null;
        state.error = 'Error, please try again!';
      });
  },
});

export default playlistSlice.reducer;
