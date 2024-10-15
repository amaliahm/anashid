import apiClient from './api.js';

export const fetchFavoriteAnasheed = (id_user) => async (dispatch) =>  {
    dispatch({
      type: 'FETCH_FAVORITE_ANASHEED_REQUEST',
    });
    try {
      const response = await apiClient.get( `/user/favorites/${id_user}` );
      dispatch({
        type: 'FETCH_FAVORITE_ANASHEED_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAVORITE_ANASHEED_FAILURE',
      });
    }
}

export const addFavoriteAnasheed = (id_user, id_anasheed) => async (dispatch) =>  {
    dispatch({
      type: 'ADD_FAVORITE_ANASHEED_REQUEST',
    });
    try {
      const response = await apiClient.post(
        '/user/favorites/add', 
        {
          id_user, 
          id_anasheed
        }
      );
      dispatch({
        type: 'ADD_FAVORITE_ANASHEED_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'ADD_FAVORITE_ANASHEED_FAILURE',
      });
    }
}

export const removeFavoriteAnasheed = (id_user, id_anasheed) => async (dispatch) =>  {
  const data = {id_user, id_anasheed}
    dispatch({
      type: 'REMOVE_FAVORITE_ANASHEED_REQUEST',
    });
    try {
      const response = await apiClient.put(
        '/user/favorites/remove', 
        {id_user, id_anasheed} 
      );
      dispatch({
        type: 'REMOVE_FAVORITE_ANASHEED_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'REMOVE_FAVORITE_ANASHEED_FAILURE',
      });
    }
}