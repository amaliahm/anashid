import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// REDUX
import { fetchHistory } from '../services/playedNowService';

// COMPONENTS
import NasheedBar from '../Components/NasheedBar';
import Loading from './Loading';

// CONTEXT
import { useUserContext } from '../hooks/userContext';

const RecentlyPlayed = () => {
  const dispatch = useDispatch()
  const { history, success, error, loading } = useSelector((state) => state.playedNow);
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    const id_user = loggedinUser
    dispatch(fetchHistory(id_user))
  }, [])

  return (
    <>
      {history && success ? 
        <div className='mb-32'>
          {Object.keys(history).map((index, data) => (
            <div key={data}>
              <h2 className='capitalize font-bold text-2xl lg:text-3xl text-[#F38BDC] mb-8 px-2'>
                {index}
              </h2>
              <div className='w-full h-full'> 
                <div
                  className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
                  >
                    {Object.keys(history[index]).map((e, i) => (
                      <NasheedBar
                        key={i}
                        title={history[index][e].nasheed_title}
                        artist={history[index][e].artist_name}
                        duration={history[index][e].duration}
                        date={history[index][e].created_at}
                        image={history[index][e].file_path}
                        id={loggedinUser}
                        id_nasheed={history[index][e].id}
                        get_data={() => {
                          const id_user = loggedinUser
                          dispatch(fetchHistory(id_user))
                        }}
                        is_favorite={history[index][e].is_favorite}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div> 
        : loading ? <Loading /> 
        : error && <Loading title='no history yet' />
      }
    </>
  );
};

export default RecentlyPlayed;
