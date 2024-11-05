import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX
import { getNewAnasheed } from '../../services/anasheedServices';
import { addListening } from '../../services/playedNowService';
import { setItemNasheed } from '../../slices/itemNasheedSlice';

//COMPONENTS
import CardComponent from '../Card';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';

const NewAnasheedSection = () => {
  const dispatch = useDispatch();
  const { anasheed, error, loading } = useSelector((state) => state.anasheed);
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    dispatch(getNewAnasheed());
  }, []);


  return (
    <div className='mb-14'>
      {anasheed && 
        <>
          <div className='flex items-center justify-between mb-6'>
            <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold capitalize">
              new 
              <span className='text-[var(--mainColor)]'> anasheed </span>
            </h2>
          </div>
          <div className='relative overflow-x-auto'>
            <div 
              className=' flex gap-2 sm:gap-4 pb-2 w-fit'
            >
              {Object.keys(anasheed).map((card, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                    dispatch(setItemNasheed({ id: anasheed[card].id, title: anasheed[card].title, artist: anasheed[card].artist_name, image: anasheed[card].file_path }))
                    dispatch( addListening(
                      { id_user: loggedinUser, id_anasheed: anasheed[card].id, position:0 }
                    ));
                    navigate(`/user/playednow/${loggedinUser}`)
                  }}
                >
                  <CardComponent 
                    image={anasheed[card].file_path}
                    title={anasheed[card].nasheed_title} 
                    subTitle={anasheed[card].artist_name}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default NewAnasheedSection;
