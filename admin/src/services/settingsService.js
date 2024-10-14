import apiClient from './api';

export const fetchTableData = (table) => async (dispatch) => {
  dispatch({
    type: 'FETCH_TABLE_DATA_REQUEST',
    payload: { table },
  });
  try {
    const response = await apiClient.get(`/admin/${table}`);
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

export const addItemToTable = (table, item) => async (dispatch) => {
  dispatch({
    type: 'ADD_ITEM_TO_TABLE_REQUEST',
    payload: { table },
  })
  try {
    const response = 
      table === 'publicity' ? 
      await apiClient.post(
        `/admin/${table}/add`, 
        item,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ) :  
      table === 'sendEmail' ?
      await apiClient.post(
        `/admin/${table}/${item.id}`, 
        {
          subject: item.subject,
          content: item.content
        }
      ) :
      await apiClient.post(
        `/admin/${table}/add`, 
        {item: item}
      );
    dispatch({
      type: 'ADD_ITEM_TO_TABLE_SUCCESS',
      payload: { table, item: response.data },
    });
  } catch (error) {
    dispatch({
      type: 'ADD_ITEM_TO_TABLE_FAILURE',
      payload: { table, error: error.data },
    })
    console.error(`Failed to add item to ${table}: `, error);
  }
};

export const deleteItemFromTable = (table, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_ITEM_FROM_TABLE_REQUEST',
    payload: { table },
  })
  try {
    await apiClient.delete(`/admin/${table}/${id}`);
    dispatch({
      type: 'DELETE_ITEM_FROM_TABLE_SUCCESS',
      payload: { table, id },
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_ITEM_FROM_TABLE_FAILURE',
      payload: { table, error: error.data },
    })
    console.error(`Failed to delete item from ${table}: `, error);
  }
};
