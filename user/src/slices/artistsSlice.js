const initialState = {
    artists: [], 
    loading: false, 
    error: false, 
    success: false
};

const artistsSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ARTISTS_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_ARTISTS_SUCCESS':
            return {
                artists: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_ARTISTS_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }

}

export default artistsSlice;
