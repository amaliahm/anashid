const initialState = {
    favoriteAnasheed: [], 
    loading: false, 
    error: false, 
    success: false
};

const favoriteAnasheedSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FAVORITE_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_FAVORITE_ANASHEED_SUCCESS':
            return {
                favoriteAnasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_FAVORITE_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'ADD_FAVORITE_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'ADD_FAVORITE_ANASHEED_SUCCESS':
            return {
                loading: false,
                error: false,
                success: true,
            };
        case 'ADD_FAVORITE_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'REMOVE_FAVORITE_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'REMOVE_FAVORITE_ANASHEED_SUCCESS':
            return {
                favoriteAnasheedSlice: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'REMOVE_FAVORITE_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }

}

export default favoriteAnasheedSlice;
