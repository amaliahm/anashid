import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from "./api";

export const fetchAnasheed = createAsyncThunk('anasheed/fetchAnasheed', async () => {
    const response = await apiClient.get('/admin/anasheed');
    return response.data; 
  });

export const addAnasheed = createAsyncThunk('anasheed/addAnasheed', async (formData) => {
    try {
        const response = await apiClient.post(
            '/admin/anasheed/add', 
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
  try {
    const response = await apiClient.delete(`/admin/anasheed/${id}`);
    return response.data.id;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export const updateAnasheed = createAsyncThunk('anasheed/updateAnasheed', async (formData) => {
  try {
      const response = await apiClient.post(
          '/admin/anasheed/update', 
          formData,
      );
      return response.data;
  } catch (e) {
      return rejectWithValue(e.response.data);
  }
});