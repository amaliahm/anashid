import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';
import { useDispatch, useSelector } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

//REDUX
import { fetchAnasheed } from '../../services/anasheedServices';

//COMPONENTS
import Loading from '../../pages/Loading';

//ICONS
import { 
  play_icon, pause_icon, 
  next_icon, previous_icon,
} from '../../assets/icons';

const NowPlaying = ({ currentTrack }) => {

  function formatDuration(duration) {
    const totalSeconds = Math.floor(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  const handleProgressChange = (e) => {
    const circle = circleRef.current;
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let newProgress = (angle + Math.PI) / (2 * Math.PI) * Math.floor(currentTrack.duration);
    newProgress = (newProgress + 250) % Math.floor(currentTrack.duration);

    setProgress(newProgress);
  };

  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (progress / Math.floor(currentTrack.duration)) * circumference;

  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(true)
  
  const [loaded, setLoaded] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);

  const playerRef = useRef(null);

  // useEffect(() => {
  //   // if (playing && !isSeeking) {
  //   //   rafRef.current = raf(renderSeekPos);
  //   // } else {
  //   //   clearRAF();
  //   // }
  //   // return () => clearRAF(); 
  // }, [playing, isSeeking]);


  const clearRAF = () => {
    raf.cancel(playerRef.current);
  };

  const renderSeekPos = () => {
    if (!isSeeking && playerRef.current) {
      setSeek(playerRef.current.seek());
    }
    // if (playing) {
    //   playerRef.current = raf(renderSeekPos);
    // }
  };

  const handleOnLoad = () => {
    console.log('loaded')
    if (playerRef.current) {
      setLoaded(true);
    }
  };

  const handleOnPlay = () => {
    console.log('Audio Playing');
    setPlaying(true);
    // renderSeekPos();
  };

  const handleOnEnd = () => {
    console.log('Audio Ended');
    setPlaying(false);
    // clearRAF();
  };

  const handleMouseDownSeek = () => setIsSeeking(true);
  const handleMouseUpSeek = (e) => {
    setIsSeeking(false);
    if (playerRef.current) {
      playerRef.current.seek(parseFloat(e.target.value));
    }
  };

  const handleSeekingChange = (e) => setSeek(parseFloat(e.target.value));

  const handleOnLoadError = (id, message) => {
    setError(true)
    console.error(`Error loading audio with ID: ${id}. Message: ${message}`);
  };

  return (
    <>
      <div className="p-2 lg:p-0">
        <div className='bg-[rgba(217,217,217,0.11)] bg-opacity-30 backdrop-blur-md w-full h-full p-2 lg:p-0 lg:rounded-b-full rounded-xl'>
          {/* <ReactHowler
            src={currentTrack.audio_path}
            playing={true}
            controls
            autoPlay={false}
            onLoad={handleOnLoad}
            // onPlay={handleOnPlay}
            // onEnd={handleOnEnd}
            onLoadError={handleOnLoadError}
            loop={true}
            mute={false}
            volume={1}
          /> */}

          <ReactAudioPlayer src={currentTrack.audio_path} controls autoPlay={false} />
          {currentTrack  ? 
            <div className='flex flex-col w-full h-16 lg:h-full justify-center space-x-8 lg:space-x-0 items-center lg:flex-none lg:rounded-b-full lg:flex-col lg:gap-4 flex-wrap'>
              <div className='order-1 lg:order-4 lg:hidden h-16 w-16 lg:w-44 lg:h-44 rounded-full bg-gray-500 bg-cover bg-center' style={{backgroundImage: `url('${currentTrack.file_path}')`}}></div>
              <div className='order-2 lg:order-1 capitalize font-semibold lg:py-8 text-center'>
                <h1 className='text-lg'>
                  {currentTrack.title}
                </h1>
                <p className='text-sm text-gray-500'>
                  {currentTrack.artist_name}
                </p>
              </div>
              <p className='hidden lg:order-3 lg:block'>
                {formatDuration(progress)}
                {' / '}
                {formatDuration(currentTrack.duration)}
              </p>
              <div className='lg:hidden order-4 lg:order-5 flex items-center gap-4 lg:gap-0 cursor-pointer '>
                  <p className='lg:hidden'>{formatDuration(progress)}</p>
                <label>
                  <input
                    type='range'
                    className='appearance-none w-full h-1 rounded-full  transition-all duration-100 hover:cursor-pointer'
                    min='0'
                    max={formatDuration(currentTrack.duration)}
                    step='.01'
                    value={seek}
                    onChange={handleSeekingChange}
                    onMouseDown={handleMouseDownSeek}
                    onMouseUp={handleMouseUpSeek}
                    style={{
                      background: `linear-gradient(to right, #774F96 ${progress}%, #AF96BC ${progress}%)`,
                    }}
                  />

                </label>
                  <p className='lg:hidden'>{formatDuration(currentTrack.duration)}</p>
              </div>
              <div className='order-5 lg:order-2 flex justify-center items-center gap-2 lg:pb-4'>
                <button className='lg:pl-4' onClick={() => {}}>
                  <img src={previous_icon} alt='previous' />
                </button>
                <button onClick={() => setPlaying(!playing)}>
                  {playing ? <img src={pause_icon} alt='pause' onClick={handleOnEnd} /> : <img src={play_icon} alt='play' onClick={handleOnPlay} /> }
                </button>
                <button className='lg:pr-4' onClick={() => {}}>
                  <img src={next_icon} alt='next' />
                </button>
              </div>
              <div 
                className="hidden lg:block lg:order-6 relative w-full h-60 mb-4" 
                ref={circleRef}
              >
                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 120 120"
                >
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#AF96BC" 
                    strokeWidth="4"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#774F96" 
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <clipPath id="circleClip">
                      <circle cx="60" cy="60" r="40" />
                    </clipPath>
                  </defs>
                  <image 
                    href={currentTrack.file_path} 
                    x="20" 
                    y="20" 
                    width="80" 
                    height="80" 
                    clipPath="url(#circleClip)" 
                    preserveAspectRatio="xMidYMid slice" 
                  />
                </svg>
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onMouseDown={handleProgressChange}
                  onMouseMove={(e) => e.buttons === 1 && handleProgressChange(e)}
                />
              </div>
            </div> 
            : <Loading />
          }
        </div>
      </div>
    </>
  )
}

export default NowPlaying