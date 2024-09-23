const initialState = {
    trashedItems: {},
    loading: false,
    error: null
};

export const trashReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TRASHED_ITEMS_SUCCESS':
            return {
                ...state,
                trashedItems: {
                    ...state.trashedItems,
                    [action.payload.table]: action.payload.data
                },
                loading: false,
            };
        case 'DONE_SUCCESS':
            console.log(action)
            return {
                ...state,
                trashedItems: {
                    ...state.trashedItems,
                    [action.payload.table]: state.trashedItems[action.payload.table].filter(
                        item => item.id !== action.payload.id
                    )
                }
            };
        default:
            return state;
    }
};

export default trashReducer;
