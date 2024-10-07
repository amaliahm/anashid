import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from "./api";

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async () => {
    const response = await apiClient.get('/admin/artists');
    return response.data; 
});


export const addArtist = createAsyncThunk('artists/addArtist', async (formData) => {
    try {
        const response = await apiClient.post(
            '/admin/artists/add', 
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
    const response = await apiClient.delete(`/admin/artists/${id}`);
    return response.data.id;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});