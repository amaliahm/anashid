import React from 'react';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const ArtistsSection = () => {

  const artists = [
    {
      artist: 'artist 1',
    },
    {
      artist: 'artist 2',
    },
    {
      artist: 'artist 3',
    },
    {
      artist: 'artist 4',
    },
    {
      artist: 'artist 5',
    },
    {
      artist: 'artist 5',
    },
    {
      artist: 'artist 6',
    },
  ];

  return (
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl lg:text-2xl font-semibold capitalize">
          popular 
          <span className='text-[var(--mainColor)]'> artists </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          className='h-6 hover:cursor-pointer'
        />
      </div>
      <div className='relative'>
        <div 
          className='overflow-x-auto flex gap-4 pb-2'
        >
          {artists.map((card, index) => (
            <div 
              key={index}
              className='w-fit p-1 flex flex-col items-center gap-2 hover:cursor-pointer bg-cover bg-center'
            >
                <div className='bg-gray-500 h-32 w-32 rounded-full'></div>
                <h3 className='text-lg font-semibold capitalize'>
                  {card.artist}
                </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsSection;
