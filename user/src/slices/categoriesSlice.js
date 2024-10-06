const initialState = {
    categories: [], 
    loading: false, 
    error: false, 
    success: false
};

const categoriesSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                categories: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_CATEGORIES_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }

}

export default categoriesSlice;
