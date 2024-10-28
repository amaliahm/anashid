import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX
import { getTrendingAnasheed } from '../../services/anasheedServices';
import { addListening } from '../../services/playedNowService';
import { setItemNasheed } from '../../slices/itemNasheedSlice';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';

const TrendingAnasheedComponent = () => {

  const dispatch = useDispatch()
  const { anasheed, error, loading } = useSelector((state) => state.anasheed);
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    dispatch(getTrendingAnasheed());
  }, [])

  return (
    <>
      <div className="mb-64 overflow-x-scroll">
        {anasheed && <>
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
            {Object.keys(anasheed).map((i, card) => (
              <tr 
                key={i} 
                className="border-b border-gray-700 hover:cursor-pointer"
                onClick={() => {
                  dispatch(setItemNasheed({ id: anasheed[card].id, title: anasheed[card].title, artist: anasheed[card].name, image: anasheed[card].file_path }))
                  dispatch( addListening(
                    { id_user: loggedinUser, id_anasheed: anasheed[card].id, position:0 }
                  ));
                  navigate(`/user/playednow/${loggedinUser}`)
                }}
              >
                <td className="py-2 font-bold">
                  #{parseInt(i) + 1}
                </td>
                <td className="py-2 flex rounded-xl items-center">
                  <div className="bg-gray-500 w-16 h-16 rounded-xl mr-2 overflow-hidden bg-center bg-cover" style={{backgroundImage: `url('${anasheed[card].file_path}')`}}> </div>
                  <div className="capitalize">
                    <p>
                      {anasheed[card].title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {anasheed[card].name}
                    </p>
                  </div>
                </td>
                <td className="py-2">
                  Sep 18, 2024
                </td>
                <td className="py-2 text-gray-400">
                  {anasheed[card].category_name}
                </td>
                <td className="py-2 text-gray-400">
                  15:10
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>}
      </div>
    </>
  )
}

export default TrendingAnasheedComponent