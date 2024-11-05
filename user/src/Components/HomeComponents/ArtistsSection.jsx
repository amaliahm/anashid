import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX
import { fetchArtists } from '../../services/artistsService';
import { setItemArtist, clearItemArtist } from '../../slices/ItemArtistSlice';

//COMPONENTS
import Loading from '../../pages/Loading';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';

const ArtistsSection = () => {
  const dispatch = useDispatch();
  const {artists, error, loading} = useSelector(state => state.artists);
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
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl lg:text-2xl font-semibold capitalize">
          popular 
          <span className='text-[var(--mainColor)]'> artists </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          onClick={() => navigate(`/user/artists/${loggedinUser}`)}
          className='h-6 hover:cursor-pointer'
        />
      </div>
      {artists ?
        <div className='relative'>
          <div 
            className='overflow-x-auto flex gap-4 pb-2'
          >
            {Object.keys(artists).map((card, index) => (
              <div 
                key={index}
                onClick={() => handleItemArtist(artists[card])}
                className='rounded-xl w-fit p-1 flex flex-col items-center gap-2 hover:cursor-pointer hover:bg-[#353141] hover:opacity-80 transition-all ease-in-out duration-300'
              >
                  <div 
                    className='bg-gray-500 h-32 w-32 rounded-full bg-cover bg-center' 
                    style={{ backgroundImage: `url('${artists[card].file_path}')`}}
                  ></div>
                  <h3 className='text-lg text-center font-semibold capitalize'>
                    {artists[card].artist_name}
                  </h3>
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

export default ArtistsSection;
