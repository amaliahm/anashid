import React from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import PublicityComponent from '../Components/HomeComponents/PublicitySlider';
import CategoriesSection from '../Components/HomeComponents/CategoriesSection';
import ArtistsSection from '../Components/HomeComponents/ArtistsSection';
import NewAnasheedSection from '../Components/HomeComponents/NewAnasheedSection';
import TrendingAnasheedComponent from '../Components/HomeComponents/TrendingAnasheed';
import SideBarMobile from '../Components/SideBarMobile';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

//ICONS
import { search_icon } from '../assets/icons';

const Home = () => {

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={1}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={1}/>
                <div className="flex justify-between items-center bg-[#1F1F1F] items-center h-fit w-96 rounded-full px-3">
                  <img 
                    src={search_icon} 
                    alt='search' 
                    className='hover:cursor-pointer' 
                  />
                  <input 
                    type="text" 
                    placeholder="Search for Anasheed" 
                    className="w-full text-white rounded-full p-3 bg-transparent"
                  />
                </div>
              </div>
              <PublicityComponent />
              {/* discover categories */}
              <CategoriesSection />
              {/* popular artists */}
              <ArtistsSection />
              {/* new anasheed */}
              <NewAnasheedSection />
              {/* trending anasheed */}
              <TrendingAnasheedComponent />
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

export default Home;
