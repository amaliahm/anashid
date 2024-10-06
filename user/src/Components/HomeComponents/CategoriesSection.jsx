import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//REDUX
import { fetchCategories } from '../../services/categoriesService';

//COMPONENTS
import CardComponent from '../Card';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const CategoriesSection = () => {

  const dispatch = useDispatch();
  const {categories, error, loading} = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  console.log(categories)

  if (categories) {
    Object.keys(categories).map((e, i) => {
      console.log(categories[e].name)
    })
  }

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
          {categories && Object.keys(categories).map((card, index) => (
            <CardComponent 
              key={index} 
              image={categories[card].file_path}
              title={categories[card].name} 
              subTitle={categories[card].anasheed || 0 + ' nasheed'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
