import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from "./api";

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async (id) => {
    const response = await apiClient.get(`/user/playlists/${id}`);
    return response.data; 
});

export const addPlaylist = createAsyncThunk('playlists/addPlaylist', async (formData) => {
    try {
        const response = await apiClient.post(
            '/user/playlists/add', 
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

export const deletePlaylist = createAsyncThunk('playlists/deletePlaylist', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.delete(`/user/playlists/${id}`);
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export const addToPlaylist = createAsyncThunk('playlists/addToPlaylist', async (data) => {
  try {
    const response = await apiClient.post(
        `/user/playlists/nasheed/add`, 
        data
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});