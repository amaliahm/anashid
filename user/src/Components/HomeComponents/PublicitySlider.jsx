import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//
import { fetchPublicities } from '../../services/publicitiesService';

//ICONS
import { left_arrow_icon, right_arrow_icon } from '../../assets/icons';

const PublicityComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.publicities);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Object.keys(data).length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Object.keys(data).length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    dispatch(fetchPublicities());
  }, [])

  return (
    <div className="lg:mr-2/3 relative mb-14">
        <div className='flex gap-4 justify-center items-center'>
            <button
              className={`p-2 rounded-full opacity-50 ${data === null || data === undefined ? 'hover:cursor-not-allowed' : 'hover:opacity-100'}`}
              disabled={data == null && data === undefined}
              onClick={() => data !== null && data !== undefined ? prevSlide() : ''}
            >
                <img 
                  src={left_arrow_icon} 
                  className='w-8'
                />
            </button>
            <div 
              className="overflow-hidden bg-gray-500 h-64 w-5/6 bg-center bg-cover rounded-3xl transition-transform duration-500" 
              style={{backgroundImage: `url('${!error && !loading && data !== undefined && data !== null && data[currentIndex] !== null && data[currentIndex] !== undefined ? data[currentIndex].file_path : ''}')`}}
            ></div>
            <button
              className={`p-2 rounded-full opacity-50 ${data === null || data === undefined ? 'hover:cursor-not-allowed' : 'hover:opacity-100'}`}
              disabled={data == null && data === undefined}
              onClick={() => data !== null && data !== undefined ? nextSlide() : ''}
            >
                <img 
                  src={right_arrow_icon} 
                  className='w-8'
                />
            </button>
        </div>
        <div className="flex justify-center items-center mt-4">
          {!error && !loading && data !== undefined && data !== null ? Object.keys(data).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 mx-1 rounded-full cursor-pointer bg-[#774F96] ${
                index === currentIndex ? 'w-3 h-3' : 'opacity-40'
              }`}
              onClick={() => goToSlide(index)}
            ></div>
          )) : [].map((_, index) => (
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