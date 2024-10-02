import React from 'react';

//COMPOENNTS
import PublicityComponent from './PublicitySlider';
import CategoriesSection from './CategoriesSection';
import ArtistsSection from './ArtistsSection';
import NewAnasheedSection from './NewAnasheedSection';
import TrendingAnasheedComponent from './TrendingAnasheed';

//ICONS
import { search_icon } from '../../assets/icons';

const MainComponent = () => {
  return (
    <div className='p-4 pr-8 w-full lg:w-[88%] bg-[#2D2635] lg:pr-20'>
        {/* search */}
      <div className="flex justify-between items-center bg-[#1F1F1F] items-center mb-8 w-96 rounded-full px-3">
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
      {/* publicities */}
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
  )
};

export default MainComponent