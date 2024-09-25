import React, { useState } from 'react';

// ICONS
import { add_icon } from '../assets/icons';

const UploadMusic = ({
    musicFile, setMusicFile, setMusicDuration, musicDuration
}) => {
  const [musicFileName, setMusicFileName] = useState(""); 

  const handleMusic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusicFile(file);
      setMusicFileName(file.name);
      const audio = document.createElement('audio');
      const url = URL.createObjectURL(file);
      audio.src = url;
      audio.onloadedmetadata = () => {
        setMusicDuration(audio.duration); 
        URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <div className='flex flex-col justify-center items-center my-3'>
      <label htmlFor='music'>
        <span className="bg-white w-fit p-2 rounded-xl flex justify-center items-center">
          <img src={add_icon} alt="add" className="p-2 hover:cursor-pointer" />
        </span>
        <input 
          type="file" 
          id="music"
          accept="audio/*" 
          onChange={handleMusic} 
          required 
        />
      </label>
      {musicFileName && (
        <p className="mt-2 text-gray-600">Selected file: {musicFileName}</p>
      )}
    </div>
  );
};


export default UploadMusic