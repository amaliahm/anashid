import React, { useState } from "react"

//ICONS
import { play, pause, sound, favorite, favorite__ } from "../assets/icons"

const NasheedBar = ({
    nasheed = {
        title: 'title',
        artists: 'artist',
        date: '05/10/2024',
        duration: '10:00'
    },
    favoriteBar = false
}) => {
    const [isPlay, setIsPlay] = useState(false)

    const togglePlay = () => setIsPlay(!isPlay)

    return (
      <>
        <div className="px-4 py-2 rounded-3xl w-full flex flex-wrap justify-evenly items-center gap-4 border-[1px] border-[#713C96] bg-[#0F1422] hover:cursor-pointer">
          <div className="flex items-center justify-between min-w-48 w-1/5 gap-2">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-500 rounded-full"></div>
            <h2 className="capitalize font-semibold text-xl lg:text-2xl">
              {nasheed.title}
            </h2>
          </div>
          <div className="flex items-center justify-evenly w-2/4 gap-2 flex-wrap min-w-32">
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{nasheed.artists}</p>
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{nasheed.date}</p>
          </div>
          <div className="flex items-center justify-evenly w-1/4 gap-2 flex-wrap min-w-32">
            {favoriteBar ? <img src={favorite__} alt="favorite" /> : <img src={sound} alt="sound" />}
            <img src={isPlay ? pause : play} alt={isPlay ? 'pause' : 'play'} onClick={togglePlay} className="hover:cursor-pointer w-6" />
            <p className="font-bold">{nasheed.duration}</p>
          </div>
        </div>
      </>
    )
}

export default NasheedBar