import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import NasheedBar from '../Components/NasheedBar';
import Loading from './Loading';

// REDUX
import { fetchFavoriteAnasheed } from '../services/favoriteService';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const Favorites = () => {
  const dispatch = useDispatch()
  const { loggedinUser } = useUserContext()
  const { favoriteAnasheed, loading, error, success } = useSelector(state => state.favorite)

  useEffect(() => {
    dispatch(fetchFavoriteAnasheed(loggedinUser))
  }, [])

  return (
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
                ? <Loading title='No data available' /> 
                  : success && favoriteAnasheed
                    ? <div>
                        {Object.keys(favoriteAnasheed).map((nasheed, index) => (
                          <NasheedBar 
                            key={index} 
                            title={favoriteAnasheed[nasheed].nasheed_title}
                            duration={favoriteAnasheed[nasheed].duration}
                            artist={favoriteAnasheed[nasheed].artist_name}
                            date={favoriteAnasheed[nasheed].created_at}
                            image={favoriteAnasheed[nasheed].file_path}
                            is_favorite={favoriteAnasheed[nasheed].is_favorite}
                            id={loggedinUser}
                            get_data={() => {
                              dispatch(fetchFavoriteAnasheed(loggedinUser))
                            }}
                            id_nasheed={favoriteAnasheed[nasheed].id}
                          />
                        ))}
                      </div>
                      : <Loading title='No data available' /> }
        </div>
      </div>
    </div>
  );
};

export default Favorites;
