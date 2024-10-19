import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemNasheed: null,
};

const itemNasheedSlice = createSlice ({
    name: 'itemNasheed',
    initialState,
    reducers: {
        setItemNasheed: (state, action) => {
            state.itemNasheed = action.payload;
        },
        clearItemNasheed: (state) => {
            state.itemNasheed = null;
        },
    }

})

export const { setItemNasheed, clearItemNasheed } = itemNasheedSlice.actions;
export default itemNasheedSlice.reducer;
