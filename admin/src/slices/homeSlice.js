const initialState = {
    data: {},
    loading: false,
    error: null
};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_ITEMS_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        default:
            return state;
    }
};

export default homeReducer;
