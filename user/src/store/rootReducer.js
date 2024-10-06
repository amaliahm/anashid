import { combineReducers } from '@reduxjs/toolkit';

//SLICES
import authReducer from '../slices/authSlice.js';
import publicitiesSlice from '../slices/publicitiesSlice.js';
import categoriesSlice from '../slices/categoriesSlice.js';
import artistsSlice from '../slices/artistsSlice.js';
import anasheedSlice from '../slices/anasheedSlice.js';

export const rootReducer = combineReducers({
    auth: authReducer,
    publicities: publicitiesSlice,
    categories: categoriesSlice,
    artists: artistsSlice,
    anasheed: anasheedSlice,
});
