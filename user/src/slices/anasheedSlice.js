const initialState = {
    anasheed: [], 
    loading: false, 
    error: false, 
    success: false,
    trending: []
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
        case 'FETCH_PLAYLIST_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_PLAYLIST_ANASHEED_SUCCESS':
            return {
                anasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_PLAYLIST_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'FETCH_NEW_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_NEW_ANASHEED_SUCCESS':
            return {
                anasheed: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_NEW_ANASHEED_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        case 'FETCH_TRENDING_ANASHEED_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_TRENDING_ANASHEED_SUCCESS':
            return {
                trending: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_TRENDING_ANASHEED_FAILURE':
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
