import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//REDUX
import { addToPlaylist, removeFromPlaylist } from '../services/playlistService';

//COMPONENTS
import SelectPlaylist from './SelectPlaylist';

const AddToPlaylistModal = ({ isOpen, onClose, id_nasheed, playlists, is_in_playlist, anasheed_playlist_id }) => {
  const dispatch = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const { success, loading, error, added } = useSelector(state => state.playlists);

  const handleAdd = async () => {
    dispatch(addToPlaylist({id: selectedPlaylist.id, id_nasheed}))
    onClose()
  };

  const handleRemove = async () => {
    dispatch(removeFromPlaylist(anasheed_playlist_id))
    onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-10 bg-white">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-2xl text-center font-bold mb-16 tracking-wider">
          {is_in_playlist ? 'Remove from ' : 'Add to '} playlist!
        </h2>
        <div className='flex justify-center items-center w-full mb-10 flex-col gap-4'>
          {!is_in_playlist && 
            <SelectPlaylist 
              label="Select playlist" 
              options={playlists} 
              selectedValue={selectedPlaylist} 
              onSelect={(item) => setSelectedPlaylist(item)} 
              name='name'
            />
          }
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {added && <p className="text-green-500 mb-4">{added}</p>}
        </div>
        <div className='flex justify-evenly items-center w-full'>
        <button
          onClick={is_in_playlist ? handleRemove : handleAdd}
          disabled={!is_in_playlist && (loading || !selectedPlaylist)}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl 
            ${! is_in_playlist && (loading || !selectedPlaylist) ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}
            `}
        >
          {loading ? 'Processing...' : is_in_playlist ? 'Remove ' : 'Add '}
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

export default AddToPlaylistModal;
