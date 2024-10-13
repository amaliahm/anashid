import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

//COMPONENTS
import SideBarMobile from "../../Components/SideBarMobile"
import Sidebar from "../../Components/SideBar"
import NasheedBar from "../../Components/NasheedBar"
import NowPlayingWrapper from "../../Components/NowPlayingWrapper"
import Loading from "../Loading"

//REDUX
import { getArtistAnasheed } from "../../services/anasheedServices"

const Artist = () => {

    //get anasheed of this artist

    const { itemArtist } = useSelector(state => state.itemArtist)
    const { anasheed, loading, error } = useSelector(state => state.anasheed)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getArtistAnasheed(itemArtist.id))
    }, [])

    return (
        <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={3}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={3}/>
              </div>
              <div className='mb-32'>
                <div className="flex justify-start items-center mb-8">
                  <div 
                    className="bg-gray-500 w-20 h-20 rounded-full bg-cover bg-center" 
                    style={{backgroundImage: `url('${itemArtist.file_path}')`}}
                  ></div>
                  <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize pl-4">
                    {itemArtist.name}
                  </h2>
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-500 mb-8 px-2 capitalize">
                  {itemArtist.bio}
                </h2>
                <div className='w-full h-full'> 
                  {loading ? <Loading /> : error ? <Loading title='no data available' /> : <div 
                    className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
                  >
                    {Object.keys(anasheed).map((nasheed, index) => (
                      <NasheedBar 
                        key={index} 
                        favoriteBar={false}
                        duration={anasheed[nasheed].duration}
                        title={anasheed[nasheed].title}
                        image={anasheed[nasheed].file_path}
                        date={anasheed[nasheed].created_at}
                        artist={anasheed[nasheed].artist_name}
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
    </div>
    )
}

export default Artist