import React, { useState, useRef, useEffect } from 'react';

//COMPONENTS
import CardComponent from '../Card';

const CategoriesSection = () => {
  const [isScrollableLeft, setScrollableLeft] = useState(false);
  const [isScrollableRight, setScrollableRight] = useState(true); // Initially show right shadow
  const scrollRef = useRef(null);

  const categories = [
    {
      category: 'Category 1',
      anasheed: '100 nasheed',
    },
    {
      category: 'Category 2',
      anasheed: '100 nasheed',
    },
    {
      category: 'Category 3',
      anasheed: '100 nasheed',
    },
    {
      category: 'Category 4',
      anasheed: '100 nasheed',
    },
    {
      category: 'Category 5',
      anasheed: '100 nasheed',
    },
    {
      category: 'Category 6',
      anasheed: '100 nasheed',
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
        discover 
        <span className='text-[var(--mainColor)]'> categories </span>
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
