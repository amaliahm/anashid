import apiClient from './api.js';

export const fetchPublicities = () => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_PUBLICITIES_REQUEST',
    });
    try {
      const response = await apiClient.get('/user/publicity');
      dispatch({
        type: 'FETCH_PUBLICITIES_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_PUBLICITIES_FAILURE',
        payload: error.message,
      });
    }
}