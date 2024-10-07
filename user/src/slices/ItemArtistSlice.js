import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemArtist: null,
};

const itemArtistSlice = createSlice ({
    name: 'itemArtist',
    initialState,
    reducers: {
        setItemArtist: (state, action) => {
            state.itemArtist = action.payload;
        },
        clearItemArtist: (state) => {
            state.itemArtist = null;
        },
    }

})

export const { setItemArtist, clearItemArtist } = itemArtistSlice.actions;
export default itemArtistSlice.reducer;
