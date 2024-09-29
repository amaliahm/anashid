import React from 'react';

//COMPOENNTS
import PublicityComponent from './PublicitySlider';

//ICONS
import { search_icon } from '../../assets/icons';

const IconPlaceholder = () => (
  <div className="w-5 h-5 bg-gray-400 rounded-sm mr-3" />
);

const MainComponent = () => (
    <div className='p-4 pr-8 w-4/5 lg:w-3/4 lg:pr-20'>
        {/* search */}
      <div className="flex justify-between items-center bg-[#1F1F1F] items-center mb-8 w-96 rounded-full px-3">
          <img src={search_icon} alt='search' />
          <input type="text" placeholder="Search for Anasheed" className="w-full text-white rounded-full p-3 bg-transparent" />
      </div>
      {/* publicities */}
      <PublicityComponent />
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

  export default MainComponent