import apiClient from './api.js';

export const fetchCategories = () => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_CATEGORIES_REQUEST',
    });
    try {
      const response = await apiClient.get('/user/categories');
      dispatch({
        type: 'FETCH_CATEGORIES_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CATEGORIES_FAILURE',
        payload: error.message,
      });
    }
}