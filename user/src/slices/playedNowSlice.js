import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayedNow, addListening, fetchHistory } from '../services/playedNowService';

const initialState = {
  history: null,
  currentTrack: null,
  currentPosition: 0,
  anasheed: [],
  isPlaying: true,
  isRepeat: false,
  isShuffle: false,
  isMute: false,
  is_favorite: false,
  errorPlayedNow: false,
  loadingPlayedNow: false,
  successPlayedNow:false,
  position: 0,
  error: false, 
  success: false,
  loading: false,
};

const playedNowSlice = createSlice({
  name: 'playedNow',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.is_favorite = action.payload.is_favorite;
    },
    setAnasheed: (state, action) => {
      state.anasheed = action.payload;
    },
    setCurrentPosition: (state, action) => { 
      state.currentPosition = action.payload;
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleMute: (state) => {
      state.isMute = !state.isMute;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleFavorite: (state) => {
      state.is_favorite = !state.is_favorite;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loadingPlayedNow = true;
        state.errorPlayedNow = false;
        state.successPlayedNow = false;
        state.error = false;
        state.success = false;
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loadingPlayedNow = false;
        state.history = action.payload;
        state.errorPlayedNow = false;
        state.successPlayedNow= true;
        state.error = false;
        state.success = true;
        state.loading = false;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loadingPlayedNow = false;
        state.successPlayedNow= false;
        state.errorPlayedNow = true;
        state.error = true;
        state.success = false;
        state.loading = false;
      })
      .addCase(fetchPlayedNow.pending, (state) => {
        state.loadingPlayedNow = true;
        state.errorPlayedNow = false;
        state.successPlayedNow = false;
      })
      .addCase(fetchPlayedNow.fulfilled, (state, action) => {
        state.loadingPlayedNow = false;
        state.anasheed = action.payload;
        console.log(action.payload[0])
        state.currentTrack = action.payload[0];
        state.errorPlayedNow = false;
        state.successPlayedNow= true
      })
      .addCase(fetchPlayedNow.rejected, (state, action) => {
        state.loadingPlayedNow = false;
        state.successPlayedNow= false;
        state.errorPlayedNow = true;
      })
      .addCase(addListening.pending, (state) => {
        state.loadingPlayedNow = true;
        state.errorPlayedNow = false;
        state.successPlayedNow = false;
      })
      .addCase(addListening.fulfilled, (state, action) => {
        state.loadingPlayedNow = false;
        state.errorPlayedNow = false;
        state.successPlayedNow= true
      })
      .addCase(addListening.rejected, (state, action) => {
        state.loadingPlayedNow = false;
        state.successPlayedNow= false;
        state.errorPlayedNow = true;
      });
  }
});

export const { setCurrentTrack, setAnasheed, toggleRepeat, toggleShuffle, toggleMute, togglePlay, toggleFavorite, setCurrentPosition } = playedNowSlice.actions;

export default playedNowSlice.reducer;