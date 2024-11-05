import apiClient from './api';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });
    const response = await apiClient.get(`/admin/users/${id}`);
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};
