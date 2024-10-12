import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import NasheedBar from '../Components/NasheedBar';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

// REDUX
import { fetchFavoriteAnasheed } from '../services/favoriteService';
import Loading from './Loading';

const Favorites = () => {
  const anasheed = [ {}, {}, {}, {}, {}, {}, {} ];
  const dispatch = useDispatch()
  const { id } = useParams()
  const { favoriteAnasheed, loading, error, success } = useSelector(state => state.favorite)

  useEffect(() => {
    dispatch(fetchFavoriteAnasheed(id))
  }, [])

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={6}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={6}/>
              </div>
              <div className='mb-32'>
                <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
                  your 
                  <span className='text-[var(--mainColor)]'> favorite </span>
                </h2>
                <div className='w-full h-full'> 
                  <div 
                    className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
                  >
                    {loading 
                      ? <Loading /> 
                        : error 
                          ? <Loading title='Error, please try again!' /> 
                            : favoriteAnasheed 
                              ? <div>
                                  {Object.keys(favoriteAnasheed).map((nasheed, index) => (
                                    <NasheedBar 
                                      key={index} 
                                      favoriteBar={true}
                                      title={favoriteAnasheed[nasheed].title}
                                      duration={favoriteAnasheed[nasheed].duration}
                                    />
                                  ))}
                                </div>
                                : <Loading title='No data available' /> }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
            <NowPlayingWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
