import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  anasheed: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchAnasheed = createAsyncThunk('anasheed/fetchAnasheed', async () => {
  const response = await axios.get('http://localhost:3000/admin/anasheed');
  return response.data; 
});

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

export const addAnasheed = createAsyncThunk('anasheed/addAnasheed', async (formData) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/admin/anasheed/add', 
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

export const deleteAnasheed = createAsyncThunk('anasheed/deleteAnasheed', async (id, { rejectWithValue }) => {
  console.log(id)
  try {
    const response = await axios.delete(`http://localhost:3000/admin/anasheed/${id}`);
    return response.data.id;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export default anasheedSlice.reducer;
