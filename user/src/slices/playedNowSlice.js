import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayedNow, addListening, fetchHistory } from '../services/playedNowService';

const initialState = {
  history: null,
  currentTrack: null,
  anasheed: [],
  isRepeat: false,
  isShuffle: false,
  isMute: false,
  error: false,
  loading: false,
  success:false,
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
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
        state.error = false;
        state.success= true
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.success= false;
        state.error = true;
      })
    builder
      .addCase(fetchPlayedNow.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(fetchPlayedNow.fulfilled, (state, action) => {
        state.loading = false;
        state.anasheed = action.payload;
        state.currentTrack = action.payload[0];
        state.error = false;
        state.success= true
      })
      .addCase(fetchPlayedNow.rejected, (state, action) => {
        state.loading = false;
        state.success= false;
        state.error = true;
      })
      .addCase(addListening.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(addListening.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success= true
      })
      .addCase(addListening.rejected, (state, action) => {
        state.loading = false;
        state.success= false;
        state.error = true;
      });
  }
});

export const { setCurrentTrack, setAnasheed, toggleRepeat, toggleShuffle, toggleMute } = playedNowSlice.actions;

export default playedNowSlice.reducer;