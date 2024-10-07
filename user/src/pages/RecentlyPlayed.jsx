import React from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import NasheedBar from '../Components/NasheedBar';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

const RecentlyPlayed = () => {
  const anasheed = [ {}, {}, {}, {}, {}, {}, {} ];

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={5}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={5}/>
              </div>
              <div className='mb-32'>
                <h2 className='capitalize font-bold text-2xl lg:text-3xl text-[#F38BDC] mb-8 px-2'>
                  today
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
                  >
                    {anasheed.map((nasheed, index) => (
                      <NasheedBar 
                        key={index} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className='mb-32'>
                <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
                  last 
                  <span className='text-[var(--mainColor)]'> week </span>
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
                  >
                    {anasheed.map((nasheed, index) => (
                      <NasheedBar 
                        key={index} 
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
  );
};

export default RecentlyPlayed;
