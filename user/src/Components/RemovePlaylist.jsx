import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

//REDUX
import { deletePlaylist } from '../services/playlistService';


const RemovePlaylist = ({ id, onClose, isOpen, name, navigate }) => {
  const dispatch = useDispatch();
  const { success, loading, error, added } = useSelector(state => state.playlists);

  const handleRemove = async () => {
    dispatch(deletePlaylist(id))
    success && onClose() 
    navigate()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-10 bg-white">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-2xl text-center font-bold mb-16 tracking-wider">
          Remove {name}!
        </h2>
        <div className='flex justify-center items-center w-full mb-10 flex-col gap-4'>
          {error && <p className="text-red-500 mb-4">Error, please try again</p>}
        </div>
        <div className='flex justify-evenly items-center w-full'>
        <button
          onClick={handleRemove}
          disabled={loading}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}
            `}
        >
          {loading ? 'Processing...' : 'Delete '}
        </button>
        <button 
          onClick={onClose} 
          className="capitalize border-[1px] border-[var(--mainColor)] font-medium px-8 py-2 my-6 rounded-2xl hover:cursor-pointer"
        >
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default RemovePlaylist;
