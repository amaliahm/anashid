import React from 'react';

// COMPONENTS
import PublicityComponent from '../Components/HomeComponents/PublicitySlider';
import CategoriesSection from '../Components/HomeComponents/CategoriesSection';
import ArtistsSection from '../Components/HomeComponents/ArtistsSection';
import NewAnasheedSection from '../Components/HomeComponents/NewAnasheedSection';
import TrendingAnasheedComponent from '../Components/HomeComponents/TrendingAnasheed';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

//ICONS
import { search_icon } from '../assets/icons';

const Home = () => {
  const { loggedinUser } = useUserContext()

  return (
    <>
      <div className='flex mb-8 gap-6 items-center'>
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
    </>
  );
};

export default Home;
