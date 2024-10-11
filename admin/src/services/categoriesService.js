import { createAsyncThunk } from '@reduxjs/toolkit';

import apiClient from "./api";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await apiClient.get('/admin/categories');
    return response.data; 
});

export const addCategory = createAsyncThunk('categories/addCategory', async (formData) => {
    try {
        const response = await apiClient.post(
            '/admin/categories/add', 
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

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.delete(`/admin/categories/${id}`);
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (formData) => {
    try {
        const response = await apiClient.put(
            '/admin/categories/update', 
            formData,
        );
        return response.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }
});