import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf'; // requestAnimationFrame polyfill

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState(0.0);
  const [rate, setRate] = useState(1);
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

    return () => clearRAF(); // Clean up when component unmounts
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

  const handleLoopToggle = () => setLoop(!loop);
  const handleMuteToggle = () => setMute(!mute);

  const handleMouseDownSeek = () => setIsSeeking(true);
  const handleMouseUpSeek = (e) => {
    setIsSeeking(false);
    if (playerRef.current) {
      playerRef.current.seek(parseFloat(e.target.value));
    }
  };

  const handleSeekingChange = (e) => setSeek(parseFloat(e.target.value));

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    if (playerRef.current) {
      playerRef.current.rate(newRate);
    }
  };

  return (
    <div className='bg-red-500 w-full h-full px-6 py-2'>
      <ReactHowler
        src={['sound.ogg', 'sound.mp3']}
        playing={playing}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        loop={loop}
        mute={mute}
        volume={volume}
        ref={playerRef}
      />

      <p>{loaded ? 'Loaded' : 'Loading'}</p>

      <div className='toggles'>
        <label>
          Loop:
          <input
            type='checkbox'
            checked={loop}
            onChange={handleLoopToggle}
          />
        </label>
        <label>
          Mute:
          <input
            type='checkbox'
            checked={mute}
            onChange={handleMuteToggle}
          />
        </label>
      </div>

      <p>
        {'Status: '}
        {seek.toFixed(2)}
        {' / '}
        {duration ? duration.toFixed(2) : 'NaN'}
      </p>

      <div className='volume'>
        <label>
          Volume:
          <input
            type='range'
            min='0'
            max='1'
            step='.05'
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          {volume.toFixed(2)}
        </label>
      </div>

      <div className='seek'>
        <label>
          Seek:
          <input
            type='range'
            min='0'
            max={duration ? duration.toFixed(2) : 0}
            step='.01'
            value={seek}
            onChange={handleSeekingChange}
            onMouseDown={handleMouseDownSeek}
            onMouseUp={handleMouseUpSeek}
          />
        </label>
      </div>

      <div className='rate'>
        <label>
          Rate:
          <input
            type='range'
            min='0.1'
            max='3'
            step='.01'
            value={rate}
            onChange={handleRateChange}
          />
          {rate.toFixed(2)}
        </label>
      </div>

      <button onClick={handleToggle}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default AudioPlayer;
