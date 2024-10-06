import apiClient from './api.js';

export const fetchArtists = () => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_ARTISTS_REQUEST',
    });
    try {
      const response = await apiClient.get('/user/artists');
      dispatch({
        type: 'FETCH_ARTISTS_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ARTISTS_FAILURE',
        payload: error.message,
      });
    }
}