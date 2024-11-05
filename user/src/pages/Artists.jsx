import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REEDUX
import { fetchArtists } from '../services/artistsService.js';
import { setItemArtist, clearItemArtist } from '../slices/ItemArtistSlice.js';

// COMPONENTS
import CardComponent from '../Components/Card';
import Loading from './Loading';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const Artists = () => {

  const { artists, loading, error } = useSelector(state => state.artists)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    dispatch(fetchArtists())
  }, [])

  const handleItemArtist = (artist) => {
    dispatch(clearItemArtist())
    dispatch(setItemArtist(artist))
    navigate(`/user/artists/artist/${loggedinUser}`)
  }

  return (
    <div className='mb-32'>
      <h2 className='capitalize font-semibold text-2xl lg:text-3xl text-[#F38BDC] mb-8 px-2'>
        artists
      </h2>
      {artists ?
        <div className='w-full h-full'> 
          <div 
            className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
          >
            {Object.keys(artists).map((card, index) => (
              <div
                key={index} 
                onClick={() => handleItemArtist(artists[card])}
              >
                <CardComponent 
                  image={artists[card].file_path}
                  title={artists[card].artist_name} 
                  subTitle={artists[card].bio}
                />
              </div>
            ))}
          </div>
        </div> : 
          loading ? 
            <Loading /> : 
              error && <Loading title="No data available"/>}
    </div>
  );
};

export default Artists;
