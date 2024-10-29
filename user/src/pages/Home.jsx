import React from 'react';

// COMPONENTS
import PublicityComponent from '../Components/HomeComponents/PublicitySlider';
import CategoriesSection from '../Components/HomeComponents/CategoriesSection';
import ArtistsSection from '../Components/HomeComponents/ArtistsSection';
import NewAnasheedSection from '../Components/HomeComponents/NewAnasheedSection';
import TrendingAnasheedComponent from '../Components/HomeComponents/TrendingAnasheed';
import NasheedSearch from '../Components/SearchComponent';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const Home = () => {
  const { loggedinUser } = useUserContext()

  return (
    <>
      <div className='flex mb-8 gap-6 items-center'>
        <NasheedSearch />
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
