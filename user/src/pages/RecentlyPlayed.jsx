import React from 'react';

// COMPONENTS
import NasheedBar from '../Components/NasheedBar';

const RecentlyPlayed = () => {
  const anasheed = [ {}, {}, {}, {}, {}, {}, {} ];

  return (
    <>
      <div className='mb-32'>
        <h2 className='capitalize font-bold text-2xl lg:text-3xl text-[#F38BDC] mb-8 px-2'>
          today
        </h2>
        <div className='w-full h-full'> 
          <div 
            className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
            >
            {anasheed.map((nasheed, index) => (
              <NasheedBar 
              key={index} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className='mb-32'>
        <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
          last 
          <span className='text-[var(--mainColor)]'> week </span>
        </h2>
        <div className='w-full h-full'> 
          <div 
            className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
            >
            {anasheed.map((nasheed, index) => (
              <NasheedBar 
              key={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentlyPlayed;
