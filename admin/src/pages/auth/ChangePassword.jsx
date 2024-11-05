import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import apiClient from '../../services/api';

//ICONS
import { bg } from '../../assets/images';

const ChangePassword = () => {
  const navigate = useNavigate()
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        setError(true)
        setDone(false)
        return;
      }
      await apiClient.post(
        `/auth/reset-password/${token}`,
        { newPassword }
      );
      setDone(true)
      setError(false)
    } catch (error) {
      console.error(error);
      setError(true)
      setDone(false)
    }
  };

  return (
    <div 
      className="bg-cover bg-center h-screen" 
      style={{ backgroundImage: `url('${bg}')`}}
    >
      <div className="flex items-center justify-between h-screen py-12 px-10 lg:px-24">
          <form 
            onSubmit={handleSubmit} 
            className="w-full p-8 rounded rounded-3xl auth-div flex flex-wrap items:center lg:justify-between border-[1px] border-[#AFAFAF]"
          >
            <div className="lg:px-80 px-4 w-full text-center lg:my-2">
              <h2 className="lg:text-4xl text-2xl capitalize text-start font-semibold mb-12 mt-4 lg:mb-20">
                reset password
              </h2>
              <div className="flex flex-col gap-8 items-start">
                <input
                  id="username"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  placeholder="New password"
                  required
                />
                {error && 
                  <p className='text-red-500 text-xs italic'>
                    Error saving new password, please try again!
                  </p>
                }
                {done && 
                  <p className='text-green-500 text-xs italic'>
                    New password saved successfully
                  </p>
                }
              </div>
              <button
                type="submit"
                className={`capitalize border-[1px] border-[var(--mainColor)] font-medium px-16 py-2 my-6 rounded-2xl ${ newPassword.length < 8 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={newPassword.length === 0}
              >
                save new password
              </button>
              <div 
                className="mt-12 mb-4 flex justify-center items-center capitalize font-semibold gap-4 hover:cursor-pointer"
              >
                <p onClick={() => navigate('/auth/login')}>
                  login ?
                </p>
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default ChangePassword;
