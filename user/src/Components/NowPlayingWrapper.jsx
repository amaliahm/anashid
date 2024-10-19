import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//COMPONENTS
import AudioPlayer from './AudioPlayer';

//REDUX
import { fetchPlayedNow } from '../services/playedNowService';
import { setItemNasheed } from '../slices/itemNasheedSlice';
import { setCurrentTrack } from '../slices/playedNowSlice.js';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const NowPlayingWrapper = () => {

  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const dispatch = useDispatch()
  const { loggedinUser } = useUserContext()
  const { loadingPlayedNow, anasheed, currentTrack, isPlaying, errorPlayedNow, successPlayedNow } = useSelector((state) => state.playedNow)
  const { itemNasheed } = useSelector((state) => state.itemNasheed)

  useEffect(() => {
    dispatch(fetchPlayedNow(loggedinUser));
    if (itemNasheed === null) {
      setItemNasheed(currentTrack)
    }
  }, [])
  
  const handleToggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleToggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  if (!currentTrack) {
    return null; 
  }

  return (
    <div className='w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto'>

    <div className='p-2 lg:p-0'>
      <div className='bg-[rgba(217,217,217,0.11)] bg-opacity-30 backdrop-blur-md w-full h-full p-2 lg:p-0 lg:rounded-b-full rounded-xl'>
        <AudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          playlist={anasheed}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onSetCurrentTrack={setCurrentTrack}
          onToggleRepeat={handleToggleRepeat}
          onToggleShuffle={handleToggleShuffle}
        />
      </div>
    </div>
    </div>
  );
};

export default NowPlayingWrapper;
