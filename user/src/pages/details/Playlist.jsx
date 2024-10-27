import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//COMPONENTS
import NasheedBar from "../../Components/NasheedBar"
import Loading from "../Loading"

//REDUX
import { getPlaylistAnasheed } from "../../services/anasheedServices"

//ICONS
import { delete_icon } from "../../assets/icons"

//CONTEXT
import { useUserContext } from "../../hooks/userContext"

const Playlist = () => {

  const { itemPlaylist } = useSelector(state => state.itemPlaylist)
  const { anasheed, loading, error } = useSelector(state => state.anasheed)
  const dispatch = useDispatch()
  const [handleDelete, setHandleDelete] = useState(false)
  const { loggedinUser } = useUserContext()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (itemPlaylist === null) {
      navigate(`/user/playlists/${loggedinUser}`)
      return
    }
    dispatch(getPlaylistAnasheed(itemPlaylist.id, loggedinUser))
  }, [])

  return (
    <div className='mb-32'>
      <div className="w-full mb-8 flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize px-2">
          {itemPlaylist?.name}
        </h2>
        <img src={delete_icon} alt="delete playlist" className="cursor-pointer" onClick={() => setHandleDelete(true)} />
      </div>
      <div className='w-full h-full'> 
        {loading ? <Loading /> : error ? <Loading title='no data available' /> : <div 
          className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
        >
          {Object.keys(anasheed).map((nasheed, index) => (
            <NasheedBar 
              key={index} 
              duration={anasheed[nasheed].duration}
              title={anasheed[nasheed].title}
              image={anasheed[nasheed].file_path}
              date={anasheed[nasheed].created_at}
              artist={anasheed[nasheed].artist_name}
              is_favorite={anasheed[nasheed].is_favorite}
              id={loggedinUser}
              anasheed_playlist_id={anasheed[nasheed].anasheed_playlist_id}
              is_in_playlist={true}
              get_data={() => {
                dispatch(getPlaylistAnasheed(itemPlaylist.id, loggedinUser))
              }}
              id_nasheed={anasheed[nasheed].id}
            />
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Playlist