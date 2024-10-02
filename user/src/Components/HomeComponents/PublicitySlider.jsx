import React, { useState } from 'react';

//ICONS
import { left_arrow_icon, right_arrow_icon } from '../../assets/icons';

const images = [
  '', '', '', '', '', ''
];

const PublicityComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="lg:mr-2/3 relative mb-14 lg:w-[78%]">
        <div className='flex gap-4 justify-center items-center'>
            <button
              className="p-2 rounded-full hover:opacity-100"
              onClick={prevSlide}
            >
                <img 
                  src={left_arrow_icon} 
                  className='w-8'
                />
            </button>
            <div 
              className="overflow-hidden bg-gray-500 h-64 w-5/6 bg-center bg-cover rounded-3xl transition-transform duration-500" 
              style={{backgroundImage: `url('${images[currentIndex]}')`}}
            ></div>
            <button
              className="p-2 rounded-full hover:opacity-100"
              onClick={nextSlide}
            >
                <img 
                  src={right_arrow_icon} 
                  className='w-8'
                />
            </button>
        </div>
        <div className="flex justify-center items-center mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 mx-1 rounded-full cursor-pointer bg-[#774F96] ${
                index === currentIndex ? 'w-3 h-3' : 'opacity-40'
              }`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
    </div>
  );
};

export default PublicityComponent;