import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemCategory: null,
};

const itemCategorySlice = createSlice ({
    name: 'itemCategory',
    initialState,
    reducers: {
        setItemCategory: (state, action) => {
            state.itemCategory = action.payload;
        },
        clearItemCategory: (state) => {
            state.itemCategory = null;
        },
    }

})

export const { setItemCategory, clearItemCategory } = itemCategorySlice.actions;
export default itemCategorySlice.reducer;
