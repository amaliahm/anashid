import { combineReducers } from '@reduxjs/toolkit';

//SLICES
import authReducer from '../slices/authSlice.js';
import profoleSlice from '../slices/profileSlice.js'

import publicitiesSlice from '../slices/publicitiesSlice.js';

import categoriesSlice from '../slices/categoriesSlice.js';
import itemCategorySlice from '../slices/itemCategorySlice.js';

import artistsSlice from '../slices/artistsSlice.js';
import itemArtistSlice from '../slices/ItemArtistSlice.js';

import anasheedSlice from '../slices/anasheedSlice.js';
import favoriteAnasheedSlice from '../slices/favoriteSlice.js';

import contactSlice from '../slices/contactSlice.js';

import playlistSlice from '../slices/playlistSlice.js';
import itemPlaylistSlice from '../slices/itemPlaylistSlice.js';

// item anasheed

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profoleSlice,

    publicities: publicitiesSlice,

    categories: categoriesSlice,
    itemCategory: itemCategorySlice,

    artists: artistsSlice,
    itemArtist: itemArtistSlice,

    anasheed: anasheedSlice,
    favorite: favoriteAnasheedSlice,

    contact: contactSlice,

    playlists: playlistSlice,
    itemPlaylist: itemPlaylistSlice,
});
