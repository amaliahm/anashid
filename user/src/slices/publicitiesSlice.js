const initialState = {
    data: [], loading: false, error: false, success: false
};

const publicitiesSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PUBLICITIES_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'FETCH_PUBLICITIES_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: false,
                success: true,
            };
        case 'FETCH_PUBLICITIES_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }

}

export default publicitiesSlice;
