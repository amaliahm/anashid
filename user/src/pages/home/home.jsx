import React from 'react';

// COMPONENTS
import Sidebar from '../../Components/SideBar';
import AudioPlayer from '../../Components/AudioPlayer';
import MainComponent from '../../Components/HomeComponents/MainComponent';

const NowPlaying = () => (
  <div className="pl-44 lg:pl-0 fixed bottom-0 right-0 w-full h-fit text-white flex items-center justify-center z-50 md:fixed md:top-0 md:right-0 md:w-96 md:h-2/3 md:bg-gray-700">
    <AudioPlayer />
  </div>
);

const Home = () => (
  <div className="flex bg-[#2D2635] text-white min-h-screen">
    <Sidebar elem={1}/>
    <div className="ml-44 lg:ml-64 w-full flex flex-col">
        <NowPlaying />
        <MainComponent />
      </div>
  </div>
);

export default Home;