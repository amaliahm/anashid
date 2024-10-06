import apiClient from './api.js';

export const fetchAnasheed = () => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_ANASHEED_REQUEST',
    });
    try {
      const response = await apiClient.get('/user/anasheed');
      dispatch({
        type: 'FETCH_ANASHEED_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ANASHEED_FAILURE',
        payload: error.message,
      });
    }
}