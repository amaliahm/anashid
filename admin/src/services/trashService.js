import apiClient from './api.js';

export const fetchTrashedItems = (table) => async (dispatch) => {
    try {
        const response = await apiClient.get(`/admin/${table}/trash`);
        dispatch({
            type: 'FETCH_TRASHED_ITEMS_SUCCESS',
            payload: { table, data: response.data }
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_TRASHED_ITEMS_ERROR',
            payload: error.message
        });
    }
};

export const restoreOrDelete = (table, id, operation) => async (dispatch) => {
    try {
        await apiClient.delete(`/admin/${table}/${operation}/${id}`);
        dispatch({ type: 'DONE_SUCCESS', payload: { table, id } });
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
    }
};
