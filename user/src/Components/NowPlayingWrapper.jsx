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

  const dispatch = useDispatch()
  const { loggedinUser } = useUserContext()
  const { currentTrack } = useSelector((state) => state.playedNow)
  const { itemNasheed } = useSelector((state) => state.itemNasheed)

  useEffect(() => {
    dispatch(fetchPlayedNow(loggedinUser));
    if (itemNasheed === null) {
      setItemNasheed(currentTrack)
    }
  }, [])

  if (!currentTrack) {
    return null; 
  }

  return (
    <div className='w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto'>

    <div className='p-2 lg:p-0'>
      <div className='bg-[rgba(217,217,217,0.11)] bg-opacity-30 backdrop-blur-md w-full h-full p-2 lg:p-0 lg:rounded-b-full rounded-xl'>
        <AudioPlayer />
      </div>
    </div>
    </div>
  );
};

export default NowPlayingWrapper;
