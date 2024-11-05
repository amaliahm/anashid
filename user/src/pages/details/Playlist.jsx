import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//COMPONENTS
import NasheedBar from "../../Components/NasheedBar"
import Loading from "../Loading"
import RemovePlaylist from "../../Components/RemovePlaylist"

//REDUX
import { getPlaylistAnasheed } from "../../services/anasheedServices"
import { setAnasheed, setCurrentTrack } from "../../slices/playedNowSlice"
import { addListening } from "../../services/playedNowService"
import { setItemNasheed } from "../../slices/itemNasheedSlice"

//ICONS
import { delete_icon, sound } from "../../assets/icons"

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
    <>
      {itemPlaylist ? 
        <div className='mb-32'>
          <div className="w-full mb-8 flex justify-between items-center flex-wrap">
            <div className="flex justify-center items-center gap-4">
              <div className="bg-gray-500 w-16 h-16 bg-cover bg-center rounded-full" style={{ background: `url('${itemPlaylist.file_path}')`}}></div>
              <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize px-2">
                {itemPlaylist.name}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img 
                src={sound} alt="play playlist" className="cursor-pointer" 
                onClick={() => {
                  dispatch(setAnasheed(anasheed))
                  const nasheed = Object.entries(anasheed)[0];
                  dispatch( setItemNasheed({ id: nasheed[1].id, title: nasheed[1].title, artist: nasheed[1].artist_name, image: nasheed[1].file_path, duration: nasheed[1].duration }))
                  dispatch( addListening({ id_user: loggedinUser, id_anasheed: nasheed[1].id, position:0 }));
                }}
              />
              <img src={delete_icon} alt="delete playlist" className="cursor-pointer" onClick={() => setHandleDelete(true)} />
            </div>
          </div>
          <div className='w-full h-full'> 
            {loading ? <Loading /> : error ? <Loading title='no data available' /> : <div 
              className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
            >
              {Object.keys(anasheed).map((nasheed, index) => (
                <NasheedBar 
                  key={index} 
                  duration={anasheed[nasheed].duration}
                  title={anasheed[nasheed].nasheed_title}
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
          {handleDelete && 
            <RemovePlaylist 
              id={itemPlaylist.id} 
              name={itemPlaylist.name} 
              onClose={() => setHandleDelete(false)} 
              isOpen={handleDelete} 
              navigate={() => navigate(`/user/playlists/${loggedinUser}`)} 
            />
          }
        </div>
      : <Loading title='Error, try again!' />}
    </>
  )
}

export default Playlist