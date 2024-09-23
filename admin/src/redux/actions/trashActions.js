import axios from 'axios';

export const fetchTrashedItems = (table) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3000/admin/${table}/trash`);
        dispatch({
            type: 'FETCH_TRASHED_ITEMS_SUCCESS',
            payload: { table, data: response.data }
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'FETCH_TRASHED_ITEMS_ERROR',
            payload: error.message
        });
    }
};

export const restoreOrDelete = (table, id, operation) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:3000/admin/${table}/${operation}/${id}`);
        dispatch({ type: 'DONE_SUCCESS', payload: { table, id } });
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
    }
};
