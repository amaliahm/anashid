import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

//COMPONENTS
import SideBarMobile from "../../Components/SideBarMobile"
import Sidebar from "../../Components/SideBar"
import NasheedBar from "../../Components/NasheedBar"
import NowPlayingWrapper from "../../Components/NowPlayingWrapper"
import Loading from "../Loading"
import RemovePlaylist from "../../Components/RemovePlaylist"

//REDUX
import { getPlaylistAnasheed } from "../../services/anasheedServices"

//ICONS
import { delete_icon } from "../../assets/icons"


const Playlist = () => {

  const { itemPlaylist } = useSelector(state => state.itemPlaylist)
  const { anasheed, loading, error } = useSelector(state => state.anasheed)
  const dispatch = useDispatch()
  const [handleDelete, setHandleDelete] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPlaylistAnasheed(itemPlaylist.id, id))
  }, [])

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={7}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={7}/>
              </div>
              <div className='mb-32'>
                <div className="w-full bg-red-500 mb-8 flex justify-between items-center">
                  <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize px-2">
                    {itemPlaylist.name}
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
                        id={id}
                        anasheed_playlist_id={anasheed[nasheed].anasheed_playlist_id}
                        is_in_playlist={true}
                        get_data={() => {
                          dispatch(getPlaylistAnasheed(itemPlaylist.id, id))
                        }}
                        id_nasheed={anasheed[nasheed].id}
                      />
                    ))}
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
            <NowPlayingWrapper />
          </div>
        </div>
      </div>
      {handleDelete && <RemovePlaylist id={itemPlaylist.id} name={itemPlaylist.name} isOpen={handleDelete} onClose={() => setHandleDelete(false)} navigate={() => navigate(`/user/playlists/${id}`)} />}
    </div>
  )
}

export default Playlist