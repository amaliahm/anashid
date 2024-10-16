import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//REDUX
import { addFavoriteAnasheed, removeFavoriteAnasheed } from "../services/favoriteService"
import { fetchPlaylists } from "../services/playlistService"

//ICONS
import { play, pause, favorite__, heart_icon, add_playlist_icon } from "../assets/icons"

//COMPONNETS
import AddToPlaylistModal from "./AddToPlaylistModal"

const NasheedBar = ({
  title= 'title',
  artist= 'artist',
  date= '05/10/2024',
  duration= '10:00',
  image = '',
  is_favorite,
  id,
  get_data,
  id_nasheed,
}) => {

    const dispatch = useDispatch()
    const { playlists, loading, error, success } = useSelector(state => state.playlists);

    const handleRemoveFavorite = () => {
      dispatch(removeFavoriteAnasheed(id, id_nasheed))
      get_data()
    }

    const handleAddFavorite = () => {
      dispatch(addFavoriteAnasheed(id, id_nasheed))
      get_data()
    }

    const [isPlay, setIsPlay] = useState(false)
    const [add, setAdd] = useState(false)
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
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    useEffect(() => {
      dispatch(fetchPlaylists(id))
    }, [])

    return (
      <div className="w-full flex justify-between items-center gap-2 mb-3">
        <div className="px-4 py-2 rounded-3xl w-full flex flex-wrap justify-evenly items-center gap-4 border-[1px] border-[#713C96] bg-[#0F1422] hover:cursor-pointer">
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
        <div 
          className="h-16 w-16 rounded-xl bg-white flex justify-center items-center hover:cursor-pointer"
          onClick={() => setAdd(true)}
        >
          <img 
            src={add_playlist_icon} 
            alt="add to playlist" 
            className="w-7"
          />
        </div>
        {add && <AddToPlaylistModal isOpen={add} onClose={() => setAdd(false)} id={id} id_nasheed={id_nasheed} playlists={playlists} />}
      </div>
    )
}

export default NasheedBar