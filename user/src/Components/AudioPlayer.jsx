import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//COMPONENTS
import Slider from '@mui/material/Slider';

//REDUX
import { 
  setCurrentTrack, 
  togglePlay, 
  toggleRepeat, 
  toggleShuffle, 
  toggleMute,
  toggleFavorite,
  setCurrentPosition
} from '../slices/playedNowSlice';
import { addFavoriteAnasheed, removeFavoriteAnasheed } from '../services/favoriteService';
import { addListening } from '../services/playedNowService';

//ICONS
import { Volume2, VolumeX } from 'lucide-react';
import { 
  favorite__, 
  heart_icon, 
  next_icon, 
  previous_icon, 
  no_repeate_icon, 
  no_shuffle_icon, 
  pause_icon, 
  play_icon, 
  repeate_one_icon, 
  shuffle_icon 
} from '../assets/icons';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { 
    currentTrack, 
    anasheed, 
    isPlaying, 
    isRepeat, 
    isShuffle, 
    isMute,
    is_favorite,
    currentPosition
  } = useSelector((state) => state.playedNow);
  const { loggedinUser } = useUserContext()

  const [value, setValue] = React.useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setValue(audioRef.current.currentTime);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNextTrack();
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, [isRepeat]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    audioRef.current.muted = isMute;
  }, [isMute]);

  const handleChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setValue(newValue);
  };

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handleMute = () => {
    dispatch(toggleMute());
  };

  const handleRemoveFavorite = (id_nasheed) => {
    dispatch(removeFavoriteAnasheed(loggedinUser, id_nasheed))
    dispatch(toggleFavorite())
  }

  const handleAddFavorite = (id_nasheed) => {
    dispatch(addFavoriteAnasheed(loggedinUser, id_nasheed))
    dispatch(toggleFavorite())
  }

  const handleNextTrack = () => {
    const currentIndex = anasheed.findIndex((track) => track.id === currentTrack.id);
    if (!isRepeat) {
      dispatch(setCurrentTrack(anasheed[currentIndex]));
      dispatch( addListening({ id_user: loggedinUser, id_anasheed: currentTrack.id, position:Math.floor(currentPosition) }));
    } else {
      const nextIndex = isShuffle
      ? Math.floor(Math.random() * anasheed.length)
      : (currentIndex + 1) % anasheed.length;
      dispatch(setCurrentTrack(anasheed[nextIndex])); 
      dispatch( addListening({ id_user: loggedinUser, id_anasheed: currentTrack.id, position:Math.floor(currentPosition) }));
      dispatch( addListening({ id_user: loggedinUser, id_anasheed: anasheed[nextIndex].id, position:0 }));
      audioRef.currentSrc = anasheed[nextIndex].audio_path
    }
    audioRef.current.currentTime = 0;
    setValue(0);
    audioRef.current.play();
  };

  const handlePrevTrack = () => {
    const currentIndex = anasheed.findIndex((track) => track.id === currentTrack.id);
    if (!isRepeat) {
      dispatch(setCurrentTrack(anasheed[currentIndex]));
      dispatch( addListening({ id_user: loggedinUser, id_anasheed: currentTrack.id, position:Math.floor(currentPosition) }));
    } else {
      const prevIndex = isShuffle
        ? Math.floor(Math.random() * anasheed.length)
        : (currentIndex - 1 + anasheed.length) % anasheed.length;
        dispatch(setCurrentTrack(anasheed[prevIndex]));
        dispatch( addListening({ id_user: loggedinUser, id_anasheed: currentTrack.id, position:Math.floor(currentPosition) }));
        dispatch( addListening({ id_user: loggedinUser, id_anasheed: anasheed[prevIndex].id, position:0 }));
        audioRef.currentSrc = anasheed[prevIndex].audio_path
    }
    audioRef.current.currentTime = 0;
    setValue(0);
    audioRef.current.play();
  };

  const handleToggleShuffle = () => {
    if (isShuffle && !isRepeat) {
      dispatch(toggleRepeat());
    }
    dispatch(toggleShuffle());
  };

  const handleToggleRepeat = () => {
    if(isRepeat && !isShuffle) {
      dispatch(toggleShuffle());
    }
    dispatch(toggleRepeat());
  };

  function formatDuration(duration) {
    const totalSeconds = Math.floor(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  if (!currentTrack) {
    return null;
  }

  const circleRef = useRef(null);

  const handleProgressChange = (e) => {
    const circle = circleRef.current;
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let progress = (angle + Math.PI) / (2 * Math.PI) * Math.floor(currentTrack.duration);
    progress = (progress + 250) % Math.floor(currentTrack.duration);
    audioRef.current.currentTime = progress;
    setValue(progress);
  };
  
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (value / Math.floor(currentTrack.duration)) * circumference;

  const handleTimeUpdate = (event) => {
    const currentPosition = event.target.currentTime;
    dispatch(setCurrentPosition(currentPosition));
  };
  
  return (
    <div className="text-white">
      <audio ref={audioRef} src={currentTrack.audio_path} onTimeUpdate={handleTimeUpdate}/>
      <div className='lg:hidden flex justify-between items-center flex-wrap'>
        <img src={currentTrack.file_path} alt={currentTrack.title} className="w-16 h-16 object-cover rounded-full" />
        <div className='flex flex-col justify-center items-center gap-2 capitalize'>
          <p className='capitalize'> 
            {currentTrack.nasheed_title || currentTrack.title}
            <span className="mx-4 text-sm text-gray-400">{currentTrack.artist_name}</span>
          </p>
          <div className="flex flex-wrap items-center space-x-4">
            <button onClick={handleToggleShuffle} className={`p-2 ${isShuffle ? 'text-green-500' : ''}`}>
              {isShuffle ? <img src={no_shuffle_icon} alt='no shuffle' /> : <img src={shuffle_icon} alt='shuffle' />}
            </button>
            <button onClick={handlePrevTrack} className="p-2">
              <img src={previous_icon} alt='previous' />
            </button>
            <button onClick={handlePlayPause} className="p-2 bg-white rounded-full">
              {isPlaying ? <img src={pause_icon} alt='pause' /> : <img src={play_icon} alt='play' />}
            </button>
            <button onClick={handleNextTrack} className="p-2">
              <img src={next_icon} alt='next' />
            </button>
            <button onClick={handleToggleRepeat} className={`p-2 ${isRepeat ? 'text-green-500' : ''}`}>
              {isRepeat ? <img src={no_repeate_icon} alt='no repeat' /> : <img src={repeate_one_icon} alt='repeat' />}
            </button>
          </div>
          <div className='flex justify-between items-center gap-2 w-96'>
            <p className='px-2'> {formatDuration(value)} </p>
            <Slider
              aria-label="Always visible"
              value={value}
              max={Math.floor(currentTrack.duration)}
              step={1}
              onChangeCommitted={handleChange}
              sx={{
                width: '90%',
                '& .MuiSlider-track': {
                  color: '#774F96',
                },
                '& .MuiSlider-rail': {
                  color: '#AF96BC',
                },
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  backgroundColor: '#774F96',
                  '&:hover': {
                    boxShadow: '0 0 0 8px rgba(255, 0, 0, 0.16)',
                  },
                },
              }}
            />
            <p className='px-2'> {formatDuration(currentTrack.duration)} </p>
            <button onClick={handleMute} className="p-2">
              {isMute ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
        <button>
          {is_favorite ? <img src={favorite__} alt='favorite' onClick={() => handleRemoveFavorite(currentTrack.id)} className='mx-auto' /> : <img src={heart_icon} alt='no favorite' onClick={() => handleAddFavorite(currentTrack.id)} className='mx-auto' />}
        </button>
      </div>
      <div className='hidden lg:block w-full p-2'>
        <div className='w-full flex flex-col justify-center items-center'>
          <p className='pt-8 pb-2 capitalize w-fit mx-auto'> {currentTrack.nasheed_title} </p>
          <p className="text-sm text-gray-400 capitalize w-fit mx-auto">{currentTrack.artist_name}</p>
          <p className='py-12'> {formatDuration(value)} / {formatDuration(currentTrack.duration)} </p>
          <div className="flex items-center space-x-2">
            <button onClick={handleToggleShuffle} className={`p-2 ${isShuffle ? 'text-green-500' : ''}`}>
              {isShuffle ? <img src={no_shuffle_icon} alt='no shuffle' /> : <img src={shuffle_icon} alt='shuffle' />}
            </button>
            <button onClick={handlePrevTrack} className="p-2">
              <img src={previous_icon} alt='previous' />
            </button>
            <button onClick={handlePlayPause} className="p-2 bg-white rounded-full">
              {isPlaying ? <img src={pause_icon} alt='pause' /> : <img src={play_icon} alt='play' />}
            </button>
            <button onClick={handleNextTrack} className="p-2">
              <img src={next_icon} alt='next' />
            </button>
            <button onClick={handleToggleRepeat} className={`p-2 ${isRepeat ? 'text-green-500' : ''}`}>
              {isRepeat ? <img src={no_repeate_icon} alt='no repeat' /> : <img src={repeate_one_icon} alt='repeat' />}
            </button>
          </div>
          <svg className="w-full h-full" viewBox="0 0 120 120"  ref={circleRef}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#AF96BC" strokeWidth="3"></circle>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#774F96" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} transform="rotate(-90 60 60)"></circle>
            <defs>
              <clipPath id="circleClip">
                <circle cx="60" cy="60" r="40" />
              </clipPath>
            </defs>
            <image href={currentTrack.file_path} x='20' y='20' width='80' height='80' clipPath="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />
          </svg>
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseDown={handleProgressChange}
            onMouseMove={(e) => e.buttons === 1 && handleProgressChange(e)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;