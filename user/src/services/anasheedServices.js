import apiClient from './api.js';

export const fetchAnasheed = (id) => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_ANASHEED_REQUEST',
    });
    try {
      const response = await apiClient.get(`/user/anasheed/${id}`);
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

export const getCategoryAnasheed = (id, user) => async (dispatch) =>  {
  dispatch({
    type: 'FETCH_CATEGORY_ANASHEED_REQUEST',
  });
  try {
    const response = await apiClient.get(`/user/anasheed/category/${id}/${user}`);
    dispatch({
      type: 'FETCH_CATEGORY_ANASHEED_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_CATEGORY_ANASHEED_FAILURE',
      payload: error.message,
    });
  }
}

export const getArtistAnasheed = (id, user) => async (dispatch) =>  {
  dispatch({
    type: 'FETCH_ARTIST_ANASHEED_REQUEST',
  });
  try {
    const response = await apiClient.get(`/user/anasheed/artist/${id}/${user}`);
    dispatch({
      type: 'FETCH_ARTIST_ANASHEED_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_ARTIST_ANASHEED_FAILURE',
      payload: error.message,
    });
  }
}

export const getPlaylistAnasheed = (id_playlist, id) => async (dispatch) =>  {
  dispatch({
    type: 'FETCH_PLAYLIST_ANASHEED_REQUEST',
  });
  try {
    const response = await apiClient.get(`/user/anasheed/playlist/${id}/${id_playlist}`);
    dispatch({
      type: 'FETCH_PLAYLIST_ANASHEED_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PLAYLIST_ANASHEED_FAILURE',
      payload: error.message,
    });
  }
}