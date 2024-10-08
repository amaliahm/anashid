import { combineReducers } from '@reduxjs/toolkit';

//SLICES
import authReducer from '../slices/authSlice.js';
import publicitiesSlice from '../slices/publicitiesSlice.js';
import categoriesSlice from '../slices/categoriesSlice.js';
import artistsSlice from '../slices/artistsSlice.js';
import anasheedSlice from '../slices/anasheedSlice.js';

import itemCategorySlice from '../slices/itemCategorySlice.js';
import itemArtistSlice from '../slices/ItemArtistSlice.js';
// item anasheed

export const rootReducer = combineReducers({
    auth: authReducer,
    publicities: publicitiesSlice,
    categories: categoriesSlice,
    artists: artistsSlice,
    anasheed: anasheedSlice,
    
    itemCategory: itemCategorySlice,
    itemArtist: itemArtistSlice,
});
