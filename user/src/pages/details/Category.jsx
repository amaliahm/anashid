import React from "react"
import { useSelector } from "react-redux"

//COMPONENTS
import SideBarMobile from "../../Components/SideBarMobile"
import Sidebar from "../../Components/SideBar"
import NasheedBar from "../../Components/NasheedBar"
import NowPlayingWrapper from "../../Components/NowPlayingWrapper"

const Category = () => {

    //get anasheed of this category

    const { itemCategory } = useSelector(state => state.itemCategory)

    return (
        <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={2}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={2}/>
              </div>
              <div className='mb-32'>
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize mb-8 px-2">
                  {itemCategory.name}
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
                  >
                    {[''].map((nasheed, index) => (
                      <NasheedBar 
                        key={index} 
                        favoriteBar={true}
                      />
                    ))}
                  </div>
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

export default Category