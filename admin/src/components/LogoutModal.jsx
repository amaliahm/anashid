import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

//REDUX
import { logoutAdmin } from '../services/authService.js';

const LogoutModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logoutAdmin(id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-2xl text-center font-bold mb-16 tracking-wider">
          Logout!
        </h2>
        {error && <p className="text-[var(--redColor)] mb-4">{error}</p>}
        <div className='flex justify-evenly items-center w-full'>
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
        >
          {loading ? 'Processing...' : 'Logout'}
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

export default LogoutModal;
