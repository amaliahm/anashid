import React, { useState, useRef, useEffect } from 'react';

//COMPONENTS
import CardComponent from '../Card';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const NewAnasheedSection = () => {
  const [isScrollableLeft, setScrollableLeft] = useState(false);
  const [isScrollableRight, setScrollableRight] = useState(true); // Initially show right shadow
  const scrollRef = useRef(null);

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
  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const maxScrollLeft =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    setScrollableLeft(scrollLeft > 0);
    setScrollableRight(scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl lg:text-2xl font-semibold capitalize">
          new 
          <span className='text-[var(--mainColor)]'> anasheed </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          className='h-6 hover:cursor-pointer'
        />
      </div>
      <div className='relative'>
        <div 
          className={`absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-900 pointer-events-none 
          ${isScrollableLeft ? 'opacity-100' : 'opacity-0'}`}
        />
        <div 
          className={`absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-900 pointer-events-none 
          ${isScrollableRight ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div 
          ref={scrollRef} 
          onScroll={handleScroll} 
          className='overflow-x-auto flex gap-4 pb-2'
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
