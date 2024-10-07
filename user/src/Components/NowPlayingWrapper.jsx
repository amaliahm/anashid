import React, { useEffect, useState } from 'react';

//COMPONENTS
import NowPlaying from './HomeComponents/NowPlaying';

const NowPlayingWrapper = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const savedTrack = localStorage.getItem('currentAnasheed');
    if (savedTrack) {
      setCurrentTrack(JSON.parse(savedTrack));
    }
  }, []);

  if (!currentTrack) {
    return null; 
  }

  return <NowPlaying currentTrack={currentTrack} />;
};

export default NowPlayingWrapper;
