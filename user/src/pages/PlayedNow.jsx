import React from 'react';

//COMPONENTE 
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';

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
          <div className='flex h-screen m-0 p-0'>
            <div className="hidden lg:block w-64 text-white ml-64">
              <Sidebar elem={4}/>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4 h-full lg:w-[calc(100vw-224px)]flex-grow w-full sm:w-full p-4 w-full overflow-y-auto"> {/*//bg with blur */}
                <div className='flex mb-8 gap-6 items-center'>
                  <SideBarMobile elem={4}/>
                </div>
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
              </div>
            </div>
          </div>
        </>
    )
}

export default PlayedNow;