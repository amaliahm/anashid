import React from 'react';

const Card = ({
    image = '', title
}) => {
    return (
        <div className={`rounded-3xl flex justify-center items-center gap-4 capitalize font-semibold bg-white bg-opacity-40 py-3 ${image === '' ? 'px-8' : 'px-4 text-[#121212]'}`}>
            {image !== '' && <div className='bg-gray-100 h-16 w-16 lg:w-20 lg:h-20  rounded-full'></div>}
            {title}
        </div>
    )
}

const PlayedNow = () => {
  return (
    <>
      <div className=" bg-green-500 h-1/2 w-2/3 rounded-3xl bg-cover bg-center mx-auto"></div>
      <h2 className='capitalize text-2xl lg:text-4xl font-semibold mx-auto'>
        nasheed
      </h2>
      <div className='mx-auto flex w-full justify-center items-center gap-12 flex-wrap'>
          <Card image='category' title='artist' />
          <Card image='category' title='category' />
      </div>
      <div className='mx-auto flex w-full justify-center items-center gap-12 flex-wrap'>
        <Card image='' title='theme' />
        <Card image='' title='gender' />
        <Card image='' title='language' />
      </div>
    </>
  )
}

export default PlayedNow;