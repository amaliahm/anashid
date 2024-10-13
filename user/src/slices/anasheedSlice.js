const initialState = {
    anasheed: [], 
    loading: false, 
    error: false, 
    success: false
};

const anasheedSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_ANASHEED_SUCCESS':
            return {
                anasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'FETCH_CATEGORY_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_CATEGORY_ANASHEED_SUCCESS':
            return {
                anasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_CATEGORY_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'FETCH_ARTIST_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_ARTIST_ANASHEED_SUCCESS':
            return {
                anasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_ARTIST_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }

}

export default anasheedSlice;
