import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayedNow, addListening, fetchHistory } from '../services/playedNowService';

const initialState = {
  history: null,
  currentTrack: null,
  anasheed: [],
  isRepeat: false,
  isShuffle: false,
  isMute: false,
  errorPlayedNow: false,
  loadingPlayedNow: false,
  successPlayedNow:false,
};

const playedNowSlice = createSlice({
  name: 'playedNow',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setAnasheed: (state, action) => {
      state.anasheed = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loadingPlayedNow = true;
        state.errorPlayedNow = false;
        state.successPlayedNow = false;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loadingPlayedNow = false;
        state.history = action.payload;
        state.errorPlayedNow = false;
        state.successPlayedNow= true
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loadingPlayedNow = false;
        state.successPlayedNow= false;
        state.errorPlayedNow = true;
      })
      .addCase(fetchPlayedNow.pending, (state) => {
        state.loadingPlayedNow = true;
        state.errorPlayedNow = false;
        state.successPlayedNow = false;
      })
      .addCase(fetchPlayedNow.fulfilled, (state, action) => {
        state.loadingPlayedNow = false;
        state.anasheed = action.payload;
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

export const { setCurrentTrack, setAnasheed, toggleRepeat, toggleShuffle, toggleMute } = playedNowSlice.actions;

export default playedNowSlice.reducer;