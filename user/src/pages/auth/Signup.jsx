import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//REDUX
import { signupReducer } from "../../services/authService.js"

//COMPONENTS
import Footer from "../../Components/Footer"

//ICONS
import { facebook, google } from "../../assets/icons"
import { signup, line } from "../../assets/images"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { errorMessage, successMessage, status } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password === form.confirmPassword) {
      dispatch(signupReducer({
        username: form.username,
        email: form.email,
        password: form.password,
      }));
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <>
      <div 
        className={`bg-cover bg-right pt-2 lg:pt-12`} 
        style={{ backgroundImage: `url('${signup}')` }}
      >
        <div className="flex items-center justify-between h-screen py-12 px-10 lg:px-24">
          <form 
            onSubmit={handleSubmit} 
            className="w-full p-8 rounded rounded-3xl auth-div flex flex-wrap items:center lg:justify-between border-[1px] border-[#AFAFAF]"
          >
            <div className="lg:my-auto mb-8 text-xl lg:text-5xl capitalize font-semibold lg:w-2/6">
              welcome to anashid digital
            </div>
            <div className="lg:pl-16 lg:w-3/6 w-full text-center">
              <h2 className="lg:text-3xl capitalize text-start font-semibold mb-4 lg:mb-10">
                sign up
              </h2>
              <div className="flex flex-col justify-between items-start">
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="w-full capitalize py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirm password"
                  className="w-full capitalize py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent"
                  required
                />
                {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              </div>
              <button 
                type="submit" 
                className={`capitalize border-[1px] border-[var(--mainColor)] bg-[rgba(255,255,255,0.3)] font-medium px-16 py-2 my-6 rounded-2xl ${ form.email.length === 0 || form.username.length === 0 || form.password.length < 8 ? 'opacity-50 cursor-not-allowed': 'cursor-pointer'}`}
                disabled={form.email.length === 0 || form.username.length === 0 || form.password.length < 8}
              >
                {status === 'loading' ? 'loading...' : 'sign up'}
              </button>
              <div className="flex justify-center lg:justify-between items-center flex-nowrap text-[#4D4D4D] capitalize font-lg font-semibold m-2 lg:px-6 overflow-hidden">
                <img 
                  src={line} 
                  alt="line"
                  className="px-3"
                />
                or
                <img 
                  src={line} 
                  alt="line"
                  className=" px-3"
                />
              </div>
              <div className="flex justify-center items-center gap-6">
                <img 
                  src={google} 
                  className="w-8 lg:w-12 hover:cursor-pointer" 
                />
                <img 
                  src={facebook} 
                  className="w-8 lg:w-12 hover:cursor-pointer"
                />
              </div>
              <div className="mt-16 flex justify-center items-center capitalize font-semibold gap-4">
                already registered?
                <span 
                  className="text-[var(--mainColor)] hover:cursor-pointer"
                  onClick={() => navigate('/auth/login')}
                >
                  login
                </span>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Signup