import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from './api';

export const fetchCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async (id) => {
    try {
        const response = await apiClient.get(`/user/profile/${id}`);
        return response.data; 
    } catch (e) {
        return []
    }
});

export const addProfilePhoto = createAsyncThunk('currentUser/addProfilePhoto', async (formData) => {
    try {
        const response = await apiClient.post(
            `/user/profile/add/${formData.id}`, 
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
