import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../redux/auth/authSlice';
import { bg } from '../../assets/images';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    setTimeout(() => {
      if (email === 'admin' && password === 'password') {
        dispatch(loginSuccess({ username: email }));
      } else {
        dispatch(loginFailure('Invalid username or password'));
      }
    }, 1000);
  };

  return (

    <div 
      className="bg-cover bg-center h-screen" 
      style={{ backgroundImage: `url('${bg}')`}}
    >
      <div className="flex items-center justify-between h-screen py-12 px-10 lg:px-24">
          <form 
            onSubmit={handleLogin} 
            className="w-full p-8 rounded rounded-3xl auth-div flex flex-wrap items:center lg:justify-between border-[1px] border-[#AFAFAF]"
          >
            <div className="lg:px-80 px-4 w-full text-center lg:my-2">
              <h2 className="lg:text-4xl text-2xl capitalize text-start font-semibold mb-12 mt-4 lg:mb-20">
                login
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
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full capitalize py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  placeholder="password"
                  required
                />
                {!error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
              <button
                type="submit"
                className={`capitalize border-[1px] border-[var(--mainColor)] font-medium px-16 py-2 my-6 rounded-2xl ${ loading ? 'opacity-50 cursor-not-allowed': 'cursor-pointer'}`}
                disabled={loading}
              >
                {loading ? 'logging in...' : 'login'}
              </button>
              <div className="mt-12 mb-4 flex justify-center items-center capitalize font-semibold gap-4">
                Forgot password ?
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Login;