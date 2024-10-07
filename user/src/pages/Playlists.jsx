import React from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import CardComponent from '../Components/Card';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

const Playlists = () => {


  const playlists = [
    { playlist: 'Playlist 1', anasheed: '100 nasheed' },
    { playlist: 'Playlist 2', anasheed: '100 nasheed' },
    { playlist: 'Playlist 3', anasheed: '100 nasheed' },
    { playlist: 'Playlist 4', anasheed: '100 nasheed' },
    { playlist: 'Playlist 5', anasheed: '100 nasheed' },
    { playlist: 'Playlist 6', anasheed: '100 nasheed' },
  ];

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
                <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
                  your 
                  <span className='text-[var(--mainColor)]'> playlists </span>
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
                  >
                    {playlists.map((card, index) => (
                      <CardComponent 
                        key={index} 
                        title={card.playlist} 
                        subTitle={card.anasheed}
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

export default Playlists;
