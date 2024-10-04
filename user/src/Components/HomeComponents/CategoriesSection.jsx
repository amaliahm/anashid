import React from 'react';

//COMPONENTS
import CardComponent from '../Card';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const CategoriesSection = () => {

  const categories = [
    { category: 'Category 1', anasheed: '100 nasheed' },
    { category: 'Category 2', anasheed: '100 nasheed' },
    { category: 'Category 3', anasheed: '100 nasheed' },
    { category: 'Category 4', anasheed: '100 nasheed' },
    { category: 'Category 5', anasheed: '100 nasheed' },
    { category: 'Category 6', anasheed: '100 nasheed' },
  ];

  return (
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl lg:text-2xl font-semibold capitalize">
          discover 
          <span className='text-[var(--mainColor)]'> categories </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          className='h-6 hover:cursor-pointer'
        />
      </div>
      <div className='overflow-x-auto' >
        <div 
          className='flex gap-2 sm:gap-4 pb-2 w-fit'
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
  );
};

export default CategoriesSection;
