import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemPlaylist: null,
};

const itemPlaylistSlice = createSlice ({
    name: 'itemCatitemPlaylistegory',
    initialState,
    reducers: {
        setItemPlaylist: (state, action) => {
            state.itemPlaylist = action.payload;
        },
        clearItemPlaylist: (state) => {
            state.itemPlaylist = null;
        },
    }

})

export const { setItemPlaylist, clearItemPlaylist } = itemPlaylistSlice.actions;
export default itemPlaylistSlice.reducer;
