import React from 'react';

// COMPONENTS
import Sidebar from '../../Components/SideBar';

const IconPlaceholder = () => (
  <div className="w-5 h-5 bg-gray-400 rounded-sm mr-3" />
);


const MainContent = () => (
  <div className="ml-64 flex-1 bg-custom-gradient p-8 pb-20">
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full max-w-md">
        <input type="text" placeholder="Search for Anasheed" className="w-full bg-[#3B3442] text-white rounded-full py-2 px-4 pl-10" />
        <IconPlaceholder className="absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
    <div className="mb-6">
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black">
        <img src="/api/placeholder/800/400" alt="Featured" className="w-full h-full object-cover opacity-70" />
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full" />
          ))}
        </div>
      </div>
    </div>
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Discover Gengre</h2>
        <IconPlaceholder />
      </div>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-40">
            <div className="w-full h-40 bg-black rounded-lg mb-2 overflow-hidden">
              <img src="/api/placeholder/160/160" alt="Genre" className="w-full h-full object-cover opacity-70" />
            </div>
            <p className="text-white">Madih</p>
            <p className="text-gray-400 text-sm">100 nasheed</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Popular Artists</h2>
        <IconPlaceholder />
      </div>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-24 text-center">
            <div className="w-24 h-24 bg-black rounded-full mb-2 overflow-hidden">
              <img src="/api/placeholder/96/96" alt="Artist" className="w-full h-full object-cover opacity-70" />
            </div>
            <p className="text-white">Sami Yusuf</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">New Anasheed</h2>
        <IconPlaceholder />
      </div>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-40">
            <div className="w-full h-40 bg-black rounded-lg mb-2 overflow-hidden">
              <img src="/api/placeholder/160/160" alt="New Anasheed" className="w-full h-full object-cover opacity-70" />
            </div>
            <p className="text-white">Madih</p>
            <p className="text-gray-400 text-sm">100 nasheed</p>
          </div>
        ))}
      </div>
    </div>
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Trending Anasheed</h2>
        <div className="flex space-x-4 text-gray-400 text-sm">
          <span>Relase Date</span>
          <span>Genre</span>
          <span>Time</span>
        </div>
      </div>
      <table className="w-full text-white bg-red-500">
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="py-2 text-gray-400">#{i}</td>
              <td className="py-2 flex items-center">
                <div className="w-10 h-10 bg-black rounded-lg mr-2 overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Trending" className="w-full h-full object-cover opacity-70" />
                </div>
                <div>
                  <p>Nasheed</p>
                  <p className="text-gray-400 text-sm">artist</p>
                </div>
              </td>
              <td className="py-2 text-gray-400">Sep 18, 2024</td>
              <td className="py-2 text-gray-400">Madih</td>
              <td className="py-2 text-gray-400">15:10</td>
              <td className="py-2"><IconPlaceholder /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const NowPlaying = () => (
  <div className="fixed top-0 right-0 w-64 bg-[#231F2A] text-white p-4 flex flex-col h-screen">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold">Nasheed name</h2>
      <p className="text-gray-400">Artist</p>
    </div>
    <div className="relative mb-6 flex-grow flex items-center justify-center">
      <div className="w-48 h-48 bg-black rounded-full overflow-hidden">
        <img src="/api/placeholder/240/240" alt="Album Art" className="w-full h-full object-cover opacity-70" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full border-4 border-[#E558D3] border-t-transparent animate-spin"></div>
      </div>
    </div>
    <div className="flex justify-between items-center mb-4">
      <IconPlaceholder />
      <IconPlaceholder />
      <IconPlaceholder />
    </div>
    <div className="w-full bg-gray-700 rounded-full h-1 mb-4">
      <div className="bg-[#E558D3] h-1 rounded-full w-1/3"></div>
    </div>
  </div>
);

const Home = () => (
  <div className="flex bg-[#2D2635] text-white min-h-screen">
    <Sidebar elem={1}/>
    <div className="flex-1">
      <MainContent />
    </div>
    {/* <NowPlaying /> */}
  </div>
);

export default Home;