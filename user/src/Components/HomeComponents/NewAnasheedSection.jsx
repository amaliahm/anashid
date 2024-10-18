import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX
import { fetchAnasheed } from '../../services/anasheedServices';
import { addListening } from '../../services/playedNowService';

//COMPONENTS
import CardComponent from '../Card';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';
import Loading from '../../pages/Loading';

const NewAnasheedSection = () => {
  const dispatch = useDispatch();
  const { anasheed, error, loading } = useSelector((state) => state.anasheed);
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  const getNewAnasheed = (data) => {
    if (data) {
      const date = new Date()
      date.setDate(date.getDate() - 10)
  
      const recentAnasheed = data.filter(nasheed => new Date(nasheed.created_at) >= date)
      if (recentAnasheed > 0) {
        return (recentAnasheed.sort((a, b) => b.created_at - a.created_at))
      }
      return recentAnasheed.sort((a, b) => b.id - a.id).slice(0, 10)
    }
  }

  useEffect(() => {
    dispatch(fetchAnasheed(loggedinUser));
  }, []);

  const newAnasheed = getNewAnasheed(anasheed)

  return (
    <div className='mb-14'>
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
          {newAnasheed ? Object.keys(newAnasheed).map((card, index) => (
            <div 
              key={index} 
              onClick={() => {
                console.log(newAnasheed[card])
                dispatch( addListening(
                  { id_user: loggedinUser, id_anasheed: newAnasheed[card].id, position:0 }
                ));
                // navigate(`/user/playednow/${loggedinUser}`)
                // localStorage.setItem('currentAnasheed', JSON.stringify(newAnasheed[card]))
              }}
            >
              <CardComponent 
                image={newAnasheed[card].file_path}
                title={newAnasheed[card].title} 
                subTitle={newAnasheed[card].artist_name}
              />
            </div>
          )) : loading ? <Loading /> : <Loading title='no data available' />}
        </div>
      </div>
    </div>
  );
};

export default NewAnasheedSection;
