import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//COMPONENTS
import NasheedBar from "../../Components/NasheedBar"
import Loading from "../Loading"

//REDUX
import { getArtistAnasheed } from "../../services/anasheedServices"
import { setAnasheed, setCurrentTrack } from "../../slices/playedNowSlice"
import { setItemNasheed } from "../../slices/itemNasheedSlice"
import { addListening } from "../../services/playedNowService"

//CONTEXT
import { useUserContext } from "../../hooks/userContext"

//ICONS
import { sound } from "../../assets/icons"

const Artist = () => {

    const { itemArtist } = useSelector(state => state.itemArtist)
    const { anasheed, loading, error } = useSelector(state => state.anasheed)
    const dispatch = useDispatch()
    const { loggedinUser } = useUserContext()
    const navigate = useNavigate()
    
    useEffect(() => {
      if (itemArtist === null) {
        navigate(`/user/artists/${loggedinUser}`)
        return
      }
      const user = loggedinUser
      dispatch(getArtistAnasheed(itemArtist.id, user))
    }, [])

    return (
      <div className='mb-32'>
        {itemArtist && 
          <>
            <div className="w-full mb-8 flex justify-between items-center flex-wrap">
              <div className="flex justify-start items-center mb-8">
                <div 
                  className="bg-gray-500 w-20 h-20 rounded-full bg-cover bg-center" 
                  style={{backgroundImage: `url('${itemArtist.file_path}')`}}
                ></div>
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize pl-4">
                  {itemArtist.artist_name}
                </h2>
              </div>
              <img  
                src={sound} alt="play playlist" className="cursor-pointer" 
                onClick={() => {
                  const nasheed = Object.entries(anasheed)[0][1]
                  dispatch( setAnasheed(anasheed))
                  dispatch( setCurrentTrack(nasheed))
                  dispatch( setItemNasheed({ id: nasheed.id, title: nasheed.title, artist: nasheed.artist_name, image: nasheed.file_path, duration: nasheed.duration }))
                  dispatch( addListening({ id_user: loggedinUser, id_anasheed: nasheed.id, position:0 }));
                }}
              />
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-500 mb-8 px-2 capitalize">
              {itemArtist.bio}
            </h2>
            <div className='w-full h-full'> 
              {loading ? <Loading /> : error ? <Loading title='no data available' /> : 
              <div 
                className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
              >
                {anasheed && Object.keys(anasheed).map((nasheed, index) => (
                  <NasheedBar 
                    key={index} 
                    duration={anasheed[nasheed].duration}
                    title={anasheed[nasheed].nasheed_title}
                    image={anasheed[nasheed].file_path}
                    date={anasheed[nasheed].created_at}
                    artist={anasheed[nasheed].artist_name}
                    is_favorite={anasheed[nasheed].is_favorite}
                    id={loggedinUser}
                    get_data={() => {
                      const user = loggedinUser
                      dispatch(getArtistAnasheed(itemArtist?.id, user))
                    }}
                    id_nasheed={anasheed[nasheed].id}
                  />
                ))}
              </div>}
            </div>
          </>
        }
      </div>
    )
}

export default Artist