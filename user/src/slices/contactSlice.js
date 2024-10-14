const initialState = {
    loading: false, 
    error: false, 
    success: false
};

const contactSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_EMAIL_REQUEST':
            return {
                loading: true,
                error: false,
                success: false,
            };
        case 'SEND_EMAIL_SUCCESS':
            return {
                loading: false,
                error: false,
                success: true,
            };
        case 'SEND_EMAIL_FAILURE':
            return {
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }
}

export default contactSlice;
