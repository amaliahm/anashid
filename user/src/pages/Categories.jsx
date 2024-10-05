import React from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import NowPlaying from '../Components/HomeComponents/NowPlaying';
import PublicityComponent from '../Components/HomeComponents/PublicitySlider';
import CategoriesSection from '../Components/HomeComponents/CategoriesSection';
import ArtistsSection from '../Components/HomeComponents/ArtistsSection';
import NewAnasheedSection from '../Components/HomeComponents/NewAnasheedSection';
import TrendingAnasheedComponent from '../Components/HomeComponents/TrendingAnasheed';
import SideBarMobile from '../Components/SideBarMobile';
import CardComponent from '../Components/Card';

//ICONS
import { search_icon } from '../assets/icons';

const Categories = () => {


  const categories = [
    { category: 'Category 1', anasheed: '100 nasheed' },
    { category: 'Category 2', anasheed: '100 nasheed' },
    { category: 'Category 3', anasheed: '100 nasheed' },
    { category: 'Category 4', anasheed: '100 nasheed' },
    { category: 'Category 5', anasheed: '100 nasheed' },
    { category: 'Category 6', anasheed: '100 nasheed' },
  ];

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
                <h2 className='capitalize font-semibold text-2xl lg:text-3xl text-[#F38BDC] mb-8'>
                  categories
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
                  >
                    {categories.map((card, index) => (
                      <CardComponent 
                        key={index} 
                        title={card.category} 
                        subTitle={card.anasheed}
                      />
                    ))}
                  </div>
                </div>
              </div>
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

export default Categories;
