import React from 'react';

// COMPONENTS
import Sidebar from '../../Components/SideBar';
import AudioPlayer from '../../Components/AudioPlayer';
import MainComponent from '../../Components/HomeComponents/MainComponent';
import NowPlaying from '../../Components/HomeComponents/NowPlaying';

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