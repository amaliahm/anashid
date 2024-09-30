import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';

//COMPONENTS
import AudioPlayer from '../../Components/AudioPlayer';
import Loading from '../Loading';

//ICONS
import { play_icon, pause_icon } from '../../assets/icons';

const NowPlaying = () => {




    const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  const handleProgressChange = (e) => {
    const circle = circleRef.current;
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let newProgress = (angle + Math.PI) / (2 * Math.PI) * 100;
    newProgress = (newProgress + 75) % 100; // Adjust starting point to top

    setProgress(newProgress);
  };
  const circumference = 2 * Math.PI * 50; // 50 is the radius
  const strokeDashoffset = circumference - (progress / 100) * circumference;





    const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(null);

  const playerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (playing && !isSeeking) {
      rafRef.current = raf(renderSeekPos);
    } else {
      clearRAF();
    }

    return () => clearRAF(); 
  }, [playing, isSeeking]);

  const clearRAF = () => {
    raf.cancel(rafRef.current);
  };

  const renderSeekPos = () => {
    if (!isSeeking && playerRef.current) {
      setSeek(playerRef.current.seek());
    }
    if (playing) {
      rafRef.current = raf(renderSeekPos);
    }
  };

  const handleToggle = () => setPlaying(!playing);
  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.stop();
      setPlaying(false);
      setSeek(0);
    }
  };
  const handleOnLoad = () => {
    if (playerRef.current) {
      setLoaded(true);
      setDuration(playerRef.current.duration());
    }
  };

  const handleOnPlay = () => {
    setPlaying(true);
    renderSeekPos();
  };

  const handleOnEnd = () => {
    setPlaying(false);
    clearRAF();
  };

  const handleMouseDownSeek = () => setIsSeeking(true);
  const handleMouseUpSeek = (e) => {
    setIsSeeking(false);
    if (playerRef.current) {
      playerRef.current.seek(parseFloat(e.target.value));
    }
  };

  const handleSeekingChange = (e) => setSeek(parseFloat(e.target.value));

    return (
        <>
        <div className="pl-44 lg:pl-0 fixed bottom-0 right-0 w-full h-fit text-white flex items-center justify-center z-50 md:fixed md:top-0 md:right-0 md:w-96 md:h-5/6">
        <div className='bg-[rgba(217,217,217,0.11)] bg-opacity-30 backdrop-blur-md w-full h-full p-2 lg:p-0 lg:rounded-b-full rounded-t-xl'>
        <ReactHowler
        src={['sound.ogg', 'sound.mp3']}
        playing={playing}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        loop={true}
        mute={false}
        volume={1.0}
        ref={playerRef}
      />
      {true ? <div className='flex w-full h-full justify-between items-center lg:flex-none lg:rounded-b-full lg:flex-col  lg:gap-4 lg:py-8'>
        
      <div className='order-1 lg:order-4 lg:hidden h-16 w-16 lg:w-44 lg:h-44 rounded-full bg-gray-500'></div>
      <div className='order-2 lg:order-1 capitalize font-semibold'>
        <h1 className='text-lg'>Title</h1>
        <p className='text-sm text-gray-500'>artist</p>
      </div>
        <p className='order-3 lg:order-2'>
        {progress.toFixed(2)}
        {' / '}
        {duration ? duration.toFixed(2) : '100'}
      </p>
      <div className='lg:hidden order-4 lg:order-5 seek flex items-center cursor-pointer'>
        <label>
          <input
            type='range'
            className='appearance-none w-full h-1 rounded-full  transition-all duration-100 hover:cursor-pointer'
            min='0'
            max={duration ? duration.toFixed(2) : 0}
            step='.01'
            value={seek}
            onChange={handleSeekingChange}
            onMouseDown={handleMouseDownSeek}
            onMouseUp={handleMouseUpSeek}
            style={{
                background: `linear-gradient(to right, #C925A5 ${20}%, #AF96BC ${20}%)`,
              }}
          />
          
        </label>
      </div>
      <button className='order-5 lg:order-3' onClick={handleToggle}>
        {playing ? <img src={pause_icon} alt='pause' /> : <img src={play_icon} alt='play' /> }
      </button>

      <div className="hidden lg:block lg:order-6 relative w-full h-80 mb-4" ref={circleRef}>
        <svg className="w-full h-full" viewBox="0 0 120 120">
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
            stroke="#C925A5" 
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
          />
          <circle 
            cx="60" 
            cy="60" 
            r="40" 
            fill="gray"
          />
        </svg>
        <div 
          className="absolute inset-0 cursor-pointer"
          onMouseDown={handleProgressChange}
          onMouseMove={(e) => e.buttons === 1 && handleProgressChange(e)}
        />
      </div>
      </div> : <Loading />}

    </div>
  </div>
        </>
    )
}

export default NowPlaying