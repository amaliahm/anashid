import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/admin/profile/${id}`);
        return response.data; 
    } catch (e) {
        return []
    }
});

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
        state.user.push(action.payload);
        state.successMessage = 'Profile photo added successfully!';
      })
      .addCase(addProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const addProfilePhoto = createAsyncThunk('currentUser/addProfilePhoto', async (formData) => {
    try {
        const response = await axios.post(
            `http://localhost:3000/admin/profile/add/${formData.id}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});

export default userSlice.reducer;
