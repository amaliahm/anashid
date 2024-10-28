import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//REDUX
import { addFavoriteAnasheed, removeFavoriteAnasheed } from "../services/favoriteService"
import { fetchPlaylists } from "../services/playlistService"
import { addListening } from "../services/playedNowService"
import { setItemNasheed } from "../slices/itemNasheedSlice"

//ICONS
import { play, pause, favorite__, heart_icon, add_playlist_icon, delete_icon } from "../assets/icons"

//COMPONNETS
import AddToPlaylistModal from "./HandleAnasheedPlaylist"

//CONTEXT
import { useUserContext } from "../hooks/userContext"

const NasheedBar = ({
  title,
  artist,
  date,
  duration,
  image,
  is_favorite,
  id,
  get_data,
  id_nasheed,
  is_in_playlist = false,
  anasheed_playlist_id = null
}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedinUser } = useUserContext()
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
    const togglePlay = () => {
      
    }

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
        <div 
          className="px-4 py-2 rounded-3xl w-full flex flex-wrap justify-evenly items-center gap-4 border-[1px] border-[#713C96] bg-[#0F1422] hover:cursor-pointer" 
        >
          <div className="flex items-center justify-between min-w-2/5 gap-2">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-500 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')`}}></div>
            <h2 className="capitalize font-semibold text-xl lg:text-2xl text-wrap">
              {title}
            </h2>
          </div>
          <div className="flex items-center justify-evenly w-1/4 flex-wrap min-w-32">
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{artist || 'artist name'}</p>
            <p className="capitalize text-[var(--semanticThirdColor)] text-sm">{formatDate(date) || 'added at'}</p>
          </div>
          <div className="flex items-center justify-evenly w-1/4 flex-wrap min-w-32">
            {is_favorite 
              ? <img src={favorite__} alt="favorite"  onClick={handleRemoveFavorite} /> 
              : <img src={heart_icon} alt="not favorite" onClick={handleAddFavorite} />
            }
            <img 
              src={isPlay ? pause : play} 
              alt={isPlay ? 'pause' : 'play'} 
              onClick={() => {
                setIsPlay(!isPlay)
                dispatch(setItemNasheed({ id: id_nasheed, title, artist, image, duration }))
                dispatch( addListening({ id_user: loggedinUser, id_anasheed: id_nasheed, position:0 }));
                navigate(`/user/playednow/${loggedinUser}`)
              }} 
              className="hover:cursor-pointer w-6" 
            />
            <p className="font-bold">
              {formatDuration(duration) || '00:00'}
            </p>
          </div>
        </div>
        <div 
          className={`h-16 w-16 rounded-xl ${is_in_playlist ? 'bg-[#0F1422] border-[1px] border-[#713C96]' : 'bg-white'} flex justify-center items-center hover:cursor-pointer`}
          onClick={() => setAdd(true)}
        >
          <img 
            src={is_in_playlist ? delete_icon : add_playlist_icon} 
            alt="add to playlist" 
            className="w-7"
          />
        </div>
        {add && <AddToPlaylistModal isOpen={add} onClose={() => {
          setAdd(false) 
          get_data()}} id={id} id_nasheed={id_nasheed} playlists={playlists} is_in_playlist={is_in_playlist} anasheed_playlist_id={anasheed_playlist_id} />}
      </div>
    )
}

export default NasheedBar