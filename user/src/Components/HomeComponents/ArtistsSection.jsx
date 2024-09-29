import React, { useState, useRef, useEffect } from 'react';

const ArtistsSection = () => {
  const [isScrollableLeft, setScrollableLeft] = useState(false);
  const [isScrollableRight, setScrollableRight] = useState(true); // Initially show right shadow
  const scrollRef = useRef(null);

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
      <h2 className="text-xl lg:text-2xl font-semibold mb-6 capitalize">
        popular 
        <span className='text-[var(--mainColor)]'> artists </span>
      </h2>
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
