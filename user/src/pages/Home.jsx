import React, { useState } from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import NowPlaying from '../Components/HomeComponents/NowPlaying';
import PublicityComponent from '../Components/HomeComponents/PublicitySlider';
import CategoriesSection from '../Components/HomeComponents/CategoriesSection';
import ArtistsSection from '../Components/HomeComponents/ArtistsSection';
import NewAnasheedSection from '../Components/HomeComponents/NewAnasheedSection';
import TrendingAnasheedComponent from '../Components/HomeComponents/TrendingAnasheed';

//ICONS
import { search_icon, close_sidebar_icon, menu_bar_icon } from '../assets/icons';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                <div className="lg:hidden">
                  <button
                    className="w-12 text-white p-2"
                    onClick={toggleMenu}
                  >
                    {isMenuOpen ? (
                      <img src={close_sidebar_icon} alt="close sidebar" />
                    ) : (
                      <img src={menu_bar_icon} alt="open sidebar" />
                    )}
                  </button>
                  
                  <div
                    className={`absolute top-0 pt-16 left-0 pl-2 w-64 text-white z-10 transition-all duration-500 ease-in-out overflow-hidden h-screen w-screen bg-[#0c121F] bg-opacity-70 hover:cursor-pointer
                    ${isMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                    onClick={toggleMenu}
                  >
                    <Sidebar elem={1} />
                  </div>
                </div>
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
            <NowPlaying />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
