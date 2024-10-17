import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

//REDUX
import { addPlaylist } from '../../services/playlistService';

//ICONS
import { add_playlist_icon } from '../../assets/icons';

//CONTEXT
import { useUserContext } from '../../hooks/userContext';

const AddPlaylist = () => {
    const { loggedinUser } = useUserContext()
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
        id: loggedinUser,
        name: name,
        photo: photo,
      }))
    }

  return (
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
  );
};

export default AddPlaylist;