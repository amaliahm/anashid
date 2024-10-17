import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX
import { fetchPlaylists } from '../services/playlistService';
import { setItemPlaylist, clearItemPlaylist } from '../slices/itemPlaylistSlice';

// COMPONENTS
import CardComponent from '../Components/Card';
import Loading from './Loading';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const Playlists = () => {

  const dispatch = useDispatch();
  const { loggedinUser } = useUserContext();
  const { playlists, loading, error, success } = useSelector(state => state.playlists);
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(fetchPlaylists(loggedinUser));
  }, [])

  const handleItemPlaylist = (playlist) => {
    dispatch(clearItemPlaylist())
    dispatch(setItemPlaylist(playlist))
    navigate(`/user/playlists/playlist/${loggedinUser}`)
  }

  return (
    <div className='mb-32'>
      <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
        your 
        <span className='text-[var(--mainColor)]'> playlists </span>
      </h2>
      {success ? 
        <div className='w-full h-full'> 
          <div 
            className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
          >
            {Object.keys(playlists).map((card, index) => (
              <div 
                key={index} 
                onClick={() => handleItemPlaylist(playlists[card])}
              > 
                <CardComponent 
                  image={playlists[card].file_path}
                  title={playlists[card].name} 
                  subTitle={(playlists[card].anasheed_count || 0) + ' nasheed'}
                />
              </div>
            ))}
          </div>
        </div> : 
          loading ? 
            <Loading /> : 
              error ? <Loading title="No data available"/> : <Loading title="No data available"/> 
      }
    </div>
  );
};

export default Playlists;
