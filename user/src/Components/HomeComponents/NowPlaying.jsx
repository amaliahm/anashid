import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';

//COMPONENTS
import Loading from '../../pages/Loading';

//ICONS
import { 
  play_icon, pause_icon, 
  next_icon, previous_icon,
  repeate_one_icon, no_repeate_icon,
  shuffle_icon, no_shuffle_icon,
} from '../../assets/icons';

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
    newProgress = (newProgress + 75) % 100;

    setProgress(newProgress);
  };

  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(null);
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

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
      <div className="p-2">
        <div className='bg-[rgba(217,217,217,0.11)] bg-opacity-30 backdrop-blur-md w-full h-full p-2 lg:p-0 lg:rounded-b-full rounded-xl'>
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
          {true ? 
            <div className='flex flex-col w-full h-16 lg:h-full justify-center space-x-8 lg:space-x-0 items-center lg:flex-none lg:rounded-b-full lg:flex-col lg:gap-4 flex-wrap'>
              <div className='order-1 lg:order-4 lg:hidden h-16 w-16 lg:w-44 lg:h-44 rounded-full bg-gray-500'></div>
              <div className='order-2 lg:order-1 capitalize font-semibold lg:py-8'>
                <h1 className='text-lg'>
                  Title
                </h1>
                <p className='text-sm text-gray-500'>
                  artist
                </p>
              </div>
              <p className='hidden lg:order-3 lg:block'>
                {progress.toFixed(2)}
                {' / '}
                {duration ? duration.toFixed(2) : '100'}
              </p>
              <div className='lg:hidden order-4 lg:order-5 flex items-center gap-4 lg:gap-0 cursor-pointer '>
                  <p className='lg:hidden'>{progress.toFixed(2)}</p>
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
                      background: `linear-gradient(to right, #774F96 ${20}%, #AF96BC ${20}%)`,
                    }}
                  />

                </label>
                  <p className='lg:hidden'>{duration ? duration.toFixed(2) : '100'}</p>
              </div>
              <div className='order-5 lg:order-2 flex justify-center items-center gap-2 lg:pb-4'>
                <button  onClick={() => setShuffle(!shuffle)}>
                  { shuffle ? <img src={shuffle_icon} alt='shuffle' /> : <img src={no_shuffle_icon} alt='no shuffle' /> }
                </button>
                <button className='lg:pl-4' onClick={() => {}}>
                  <img src={previous_icon} alt='previous' />
                </button>
                <button onClick={() => setPlaying(!playing)}>
                  {playing ? <img src={pause_icon} alt='pause' /> : <img src={play_icon} alt='play' /> }
                </button>
                <button className='lg:pr-4' onClick={() => {}}>
                  <img src={next_icon} alt='next' />
                </button>
                <button  onClick={() => setRepeat(!repeat)}>
                  {repeat ? <img src={repeate_one_icon} alt='repeat' /> : <img src={no_repeate_icon} alt='no repeat' /> }
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
            </div> 
            : <Loading />
          }
        </div>
      </div>
    </>
  )
}

export default NowPlaying