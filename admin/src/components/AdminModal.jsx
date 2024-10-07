import React, { useState } from 'react';

import apiClient from '../services/api.js';

const AdminModal = ({ isOpen, onClose, user, adminId }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
        const response = await apiClient.post(
            `/admin/users/${adminId}`,
            {
                password,
                userId: user.id,
                account_type: user.account_type,
                adminId: adminId,
            }
        );
        setIsLoading(false);
        if (response.data.success) {
          setSuccess('Done successfully');
          setErrorMessage('');
          onClose()
        } else {
          setErrorMessage('Password is wrong, try again');
          setSuccess('');
        }
    } catch (e) {
        setErrorMessage('An error occurred, please try again');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-2xl text-center font-bold mb-16 tracking-wider">
          {user.account_type === "admin" 
            ? `Remove ${user.username} from admin list?`
            : `Add ${user.username} to admin list`
          }
        </h2>
        <label className="block mb-2 capitalize" htmlFor="password">
          enter your password to confirm
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
        />
        {errorMessage && <p className="text-[var(--redColor)] mb-4">{errorMessage}</p>}
        {success && <p className="text-[var(--greenColor)] mb-4">{success}</p>}
        <div className='flex justify-evenly items-center w-full'>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !password}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl ${isLoading || !password ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
        >
          {isLoading ? 'Processing...' : 'Submit'}
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

export default AdminModal;
