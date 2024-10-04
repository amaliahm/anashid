import React, { useState, useRef, useEffect } from 'react';

//COMPONENTS
import CardComponent from '../Card';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const NewAnasheedSection = () => {

  const newAnasheed = [
    {
      nasheed: 'nasheed 1',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 2',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 3',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 4',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 5',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 6',
      artist: 'artist name',
    },
    {
      nasheed: 'nasheed 7',
      artist: 'artist name',
    },
  ];

  useEffect(() => {
  }, []);

  return (
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold capitalize">
          new 
          <span className='text-[var(--mainColor)]'> anasheed </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          className='h-6 hover:cursor-pointer'
        />
      </div>
      <div className='relative overflow-x-auto'>
        <div 
          className=' flex gap-2 sm:gap-4 pb-2 w-fit'
        >
          {newAnasheed.map((card, index) => (
            <CardComponent 
              key={index} 
              title={card.nasheed} 
              subTitle={card.artist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewAnasheedSection;
