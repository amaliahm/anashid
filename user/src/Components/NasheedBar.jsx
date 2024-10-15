import React, { useState } from "react"

//ICONS
import { play, pause, favorite__, heart_icon } from "../assets/icons"

const NasheedBar = ({
  title= 'title',
  artist= 'artist',
  date= '05/10/2024',
  duration= '10:00',
  image = '',
  is_favorite,
  handleAddFavorite,
  handleRemoveFavorite
}) => {

    const [isPlay, setIsPlay] = useState(false)
    const togglePlay = () => setIsPlay(!isPlay)

    function formatDuration(duration) {
      const totalSeconds = Math.floor(duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutes}:${formattedSeconds}`;
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    return (
      <>
        <div className="px-4 py-2 rounded-3xl w-full flex flex-wrap justify-evenly items-center gap-4 border-[1px] border-[#713C96] bg-[#0F1422] hover:cursor-pointer mb-3">
          <div className="flex items-center justify-between min-w-2/5 gap-2">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-500 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')`}}></div>
            <h2 className="capitalize font-semibold text-xl lg:text-2xl text-wrap">
              {title}
            </h2>
          </div>
          <div className="flex items-center justify-evenly w-1/4 flex-wrap min-w-32">
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{artist}</p>
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{formatDate(date)}</p>
          </div>
          <div className="flex items-center justify-evenly w-1/4 flex-wrap min-w-32">
            {is_favorite 
              ? <img src={favorite__} alt="favorite"  onClick={handleRemoveFavorite} /> 
              : <img src={heart_icon} alt="not favorite" onClick={handleAddFavorite} />
            }
            <img 
              src={isPlay ? pause : play} 
              alt={isPlay ? 'pause' : 'play'} 
              onClick={togglePlay} 
              className="hover:cursor-pointer w-6" 
            />
            <p className="font-bold">
              {formatDuration(duration)}
            </p>
          </div>
        </div>
      </>
    )
}

export default NasheedBar