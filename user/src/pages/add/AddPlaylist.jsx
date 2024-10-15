import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import Sidebar from '../../Components/SideBar';
import SideBarMobile from '../../Components/SideBarMobile';
import NowPlayingWrapper from '../../Components/NowPlayingWrapper';

//REDUX
import { addPlaylist } from '../../services/playlistService';

//ICONS
import { add_playlist_icon, close_sidebar_icon } from '../../assets/icons';

const AddPlaylist = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ photo, setPhoto ] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const { loading, success, error } = useSelector((state) => state.playlists)

    const handlePhoto = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(addPlaylist({
        id: id,
        name: name,
        photo: photo,
      }))
    }

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className="hidden lg:block w-64 text-white ml-64">
        <Sidebar elem={8}/>
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={8}/>
              </div>
              <div className='mb-32'>
                <h2 className="text-xl lg:text-2xl font-bold capitalize mb-8 px-2">
                  Add 
                  <span className='text-[var(--mainColor)]'> playlist </span>
                </h2>
                <div className='w-full h-full'> 
                  <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-full'>
                    <form onSubmit={handleSubmit} >
                      <div className="flex flex-col items-center">
                        <div 
                          className={`bg-gray-500 w-[400px] h-[400px] rounded-full bg-cover bg-center`}
                          style={{ backgroundImage: `url(${photoPreview})` }}
                        >
                        </div>
                        <label for='images' className='w-full'>
                          <span 
                            className="bg-white w-fit p-2 rounded-xl flex justify-center items-center ml-auto"
                          >
                            <img 
                              src={add_playlist_icon}
                              alt="add"
                              className="p-2 hover:cursor-pointer"
                            />
                          </span>
                          <input 
                            type="file" 
                            id="images"
                            onChange={handlePhoto} 
                            className="hidden"
                            required 
                          />
                        </label>
                      </div>
                      <div className="my-16 p-16 flex flex-col justify-between items-center">
                        <input 
                          className="w-[400px] py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[#282C34] placeholder-[var(--textColor)] font-base"
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Playlist name"
                          required 
                        />
                        <button 
                          type="submit" 
                          disabled={loading || !name || !photo}
                          className={`border-[1px] border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] text-xl font-semibold hover:cusor-pointer mb-10 ${loading || !name || !photo ? 'hover:cursor-not-allowed opacity-50' : 'hover:cusor-pointer'} `}
                        >
                          {loading ? 'Adding...' : 'Add '}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500" >{success}</p>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
            <NowPlayingWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;