import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//ICONS
import { signup } from '../../assets/images';

import apiClient from '../../services/api';

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('');

  const handleResetPw = async (e) => {
    e.preventDefault();
    try {
        await apiClient.post('/auth/forget-password', { email });
        setDone(true);
        setError(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setDone(false);
      }
  };

  return (
    <div 
      className="bg-cover bg-center h-screen" 
      style={{ backgroundImage: `url('${signup}')`}}
    >
      <div className="flex items-center justify-between h-screen py-12 px-10 lg:px-24">
          <form 
            onSubmit={handleResetPw} 
            className="w-full p-8 rounded rounded-3xl auth-div flex flex-wrap items:center lg:justify-between border-[1px] border-[#AFAFAF]"
          >
            <div className="lg:px-80 px-4 w-full text-center lg:my-2">
              <h2 className="lg:text-4xl text-2xl capitalize text-start font-semibold mb-12 mt-4 lg:mb-20">
                forget password
              </h2>
              <div className="flex flex-col gap-8 items-start">
                <input
                  id="username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  placeholder="Email"
                  required
                />
                {error && 
                  <p className='text-red-500 text-xs italic'>
                    Error sending password reset link, please try again!
                  </p>
                }
                {done && 
                  <p className='text-green-500 text-xs italic'>
                    Password reset link sent to your email
                  </p>
                }
              </div>
              <button
                type="submit"
                className={`capitalize border-[1px] border-[var(--mainColor)] font-medium px-16 py-2 my-6 rounded-2xl ${ email.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={email.length === 0}
              >
                send email
              </button>
              <div 
                className="mt-12 mb-4 flex justify-center items-center capitalize font-semibold gap-4 hover:cursor-pointer"
                onClick={() => navigate('/auth/login')}
              >
                login ?
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default ForgetPassword;
