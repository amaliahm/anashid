import apiClient from './api.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHistory = createAsyncThunk('playedNow/fetchHistory', async (id_user, id_anasheed) => {
    const response = await apiClient.get(`/user/playednow/${id_user}/${id_anasheed}`);
    return response.data;
})

export const fetchPlayedNow = createAsyncThunk('playedNow/fetchPlayedNow', async (id_user) => {
    const response = await apiClient.get(`/user/playednow/${id_user}`);
    return response.data;
})

export const addListening = createAsyncThunk('playedNow/addListening', async (data) => {
    try {
        const response = await apiClient.post(
            '/user/playednow/add', 
            data
        );
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});