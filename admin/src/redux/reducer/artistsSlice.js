import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  artists: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async () => {
  const response = await axios.get('http://localhost:3000/admin/artists');
  return response.data; 
});

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

export const addArtist = createAsyncThunk('artists/addArtist', async (formData) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/admin/artists/add', 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export const deleteArtist = createAsyncThunk('artists/deleteArtist', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:3000/admin/artists/${id}`);
    return response.data.id;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export default artistSlice.reducer;
