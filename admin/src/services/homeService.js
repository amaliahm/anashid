import apiClient from './api.js';

export const fetchData = () => async (dispatch) => {
    try {
        const response = await apiClient.get(`/admin/home/`);
        dispatch({
            type: 'FETCH_DATA_ITEMS_SUCCESS',
            payload: { data: response.data }
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_DATA_ITEMS_ERROR',
            payload: error.message
        });
    }
};
