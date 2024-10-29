import apiClient from './api';

export const fetchFilterData = (table) => async (dispatch) => {
  dispatch({
    type: 'FETCH_TABLE_DATA_REQUEST',
    payload: { table },
  });
  try {
    const response = await apiClient.get(`/user/${table}`);
    dispatch({
      type: 'FETCH_TABLE_DATA_SUCCESS',
      payload: { table, data: response.data },
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_TABLE_DATA_FAILURE',
      payload: { table, error: error.data },
    })
  }
};

export const searchForNasheed = (searchQuery) => async (dispatch) => {
  const table = 'result'
  dispatch({
    type: 'FETCH_SEARCH_DATA_REQUEST',
    payload: { table },
  });
  try {
    const response = await apiClient.put('/user/search', {searchQuery});
    dispatch({
      type: 'FETCH_SEARCH_DATA_SUCCESS',
      payload: { table, data: response.data },
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_SEARCH_DATA_FAILURE',
      payload: { table, error: error.data },
    })
  }
};

export const filterForNasheed = ({gender, theme, language}) => async (dispatch) => {
  const table = 'result'
  dispatch({
    type: 'FETCH_SEARCH_DATA_REQUEST',
    payload: { table },
  });
  try {
    const response = await apiClient.put('/user/search/filter', {gender, theme, language});
    dispatch({
      type: 'FETCH_SEARCH_DATA_SUCCESS',
      payload: { table, data: response.data },
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_SEARCH_DATA_FAILURE',
      payload: { table, error: error.data },
    })
  }
};
