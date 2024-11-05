import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

//REDUX
import { getTrendingAnasheed } from '../../services/anasheedServices';
import { addListening } from '../../services/playedNowService';
import { setItemNasheed } from '../../slices/itemNasheedSlice';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';

const TrendingAnasheedComponent = () => {

  const dispatch = useDispatch()
  const { trending, error, loading } = useSelector((state) => state.anasheed);
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    dispatch(getTrendingAnasheed());
  }, [])

  function formatDuration(duration) {
    const totalSeconds = Math.floor(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  return (
    <>
      <div className="mb-64 overflow-x-scroll">
        {trending && 
          <>
            <div className="flex justify-between items-center pr-10">
              <h2 className="text-xl lg:text-2xl font-semibold mb-8 capitalize">
                trending  
                <span className='text-[var(--mainColor)]'> anasheed </span>
              </h2>
              <div className='flex justify-center items-center space-x-20 lg:space-x-32'>
                <span className="flex space-x-4 text-gray-400 text-sm">
                  Relase Date
                </span>
                <span className="flex space-x-4 text-gray-400 text-sm">
                  Category
                </span>
                <span className="flex space-x-4 text-gray-400 text-sm">
                  Time
                </span>
              </div>
            </div>
            <table className="w-full text-white capitalize font-semibold">
              <tbody>
                {Object.keys(trending).map((i, card) => (
                  <tr 
                    key={i} 
                    className="border-b border-gray-700 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(setItemNasheed({ id: trending[card].id, title: trending[card].title, artist: trending[card].name, image: trending[card].file_path }))
                      dispatch( addListening(
                        { id_user: loggedinUser, id_anasheed: trending[card].id, position:0 }
                      ));
                      navigate(`/user/playednow/${loggedinUser}`)
                    }}
                  >
                    <td className="py-2 font-bold">
                      #{parseInt(i) + 1}
                    </td>
                    <td className="py-2 flex rounded-xl items-center">
                      <div className="bg-gray-500 w-16 h-16 rounded-xl mr-2 overflow-hidden bg-center bg-cover" style={{backgroundImage: `url('${trending[card].file_path}')`}}> </div>
                      <div className="capitalize">
                        <p>
                          {trending[card].nasheed_title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {trending[card].name}
                        </p>
                      </div>
                    </td>
                    <td className="py-2">
                      {(trending[card].release_date).slice(0, 10)}
                    </td>
                    <td className="py-2 text-gray-400">
                      {trending[card].category_name}
                    </td>
                    <td className="py-2 text-gray-400">
                      {formatDuration(trending[card].duration)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      </div>
    </>
  )
}

export default TrendingAnasheedComponent