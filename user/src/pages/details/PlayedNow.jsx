import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//REDUX
import { fetchPlayedNow } from '../../services/playedNowService';
import { setItemNasheed } from '../../slices/itemNasheedSlice';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';
import Loading from '../Loading';


const Card = ({ image = '', title }) => {
  return (
    <div className={`rounded-3xl flex justify-center items-center gap-4 capitalize font-semibold bg-white bg-opacity-40 py-3 ${image === '' ? 'px-8' : 'px-4 text-[#121212]'}`}>
      {image !== '' && <div className='bg-gray-100 h-16 w-16 lg:w-20 lg:h-20 rounded-full bg-cover bg-center' style={{backgroundImage: `url('${image}')`}}></div>}
      {title}
    </div>
  )
}

const PlayedNow = () => {
  const dispatch = useDispatch()
  const { loggedinUser } = useUserContext()
  const { currentTrack } = useSelector((state) => state.playedNow)

  useEffect(() => {
    dispatch(fetchPlayedNow(loggedinUser))
    dispatch(setItemNasheed(currentTrack))
  }, [])

  return (
    <>
      {currentTrack ? 
        <div className='h-screen flex flex-col justify-start items-center gap-12 mb-32'>
          <div 
            className=" bg-gray-500 h-1/2 w-2/3 rounded-3xl bg-cover bg-center mx-auto" 
            style={{backgroundImage: `url('${currentTrack.file_path}')`}}
          ></div>
          <h2 className='capitalize text-2xl lg:text-4xl font-semibold mx-auto'>
            {currentTrack.nasheed_title}
          </h2>
          <div className='mx-auto flex w-full justify-center items-center gap-12 flex-wrap'>
            <Card image={currentTrack.artist_image} title={currentTrack.artist_name}/>
            <Card image={currentTrack.category_image} title={currentTrack.category_name} />
          </div>
          <div className='mx-auto flex w-full justify-center items-center gap-12 flex-wrap'>
            <Card title={currentTrack.gender_value} />
            <Card title={currentTrack.theme_value} />
            <Card title={currentTrack.language_value} />
          </div>
        </div> : 
        <Loading title='No nasheed was playing' />
      }
    </>
  )
}

export default PlayedNow;