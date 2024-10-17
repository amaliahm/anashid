import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// REDUX
import { loginReducer } from "../../services/authService.js"
import { useUserContext } from "../../hooks/userContext"

//COMPONENTS
import Footer from "../../Components/Footer"

//ICONS
import { facebook, google } from "../../assets/icons"
import { signup, line } from "../../assets/images"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { setLoggedinUser } = useUserContext()
  const { errorMessage, successMessage, status } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginReducer(form));
    if (result.meta.requestStatus === 'fulfilled') {
      const userId = result.payload.user?.id;
      if (userId) {
        navigate(`/user/home/${userId}`); 
      }
    } else {
      console.error('Login failed:', result.payload);
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
              welcome back!
            </div>
            <div className="lg:pl-16 lg:w-3/6 w-full text-center">
              <h2 className="lg:text-3xl capitalize text-start font-semibold mb-12 mt-4 lg:mb-10">
                login
              </h2>
              <div className="flex flex-col justify-between items-start">
                <input
                  type="email"
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
                {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
              </div>
              <button 
                type="submit" 
                className={`capitalize border-[1px] border-[var(--mainColor)] bg-[rgba(255,255,255,0.3)] font-medium px-16 py-2 my-6 mt-12 rounded-2xl ${form.email.length === 0 || form.password.length < 8 ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
                disabled={form.email.length === 0 || form.password.length < 8}
              >
                {status === 'loading' || loading ? 'loading...' : 'login'}
              </button>
              <p 
                className="text-[var(--mainColor)] hover:cursor-pointer capitalize font-semibold"
                onClick={() => navigate('/auth/forget-password')}
              >
                forget password?
              </p>
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
              <div className="mt-16 mb-4 flex justify-center items-center capitalize font-semibold gap-4">
                don't have an account?
                <span 
                  className="text-[var(--mainColor)] hover:cursor-pointer"
                  onClick={() => navigate('/auth/signup')}
                >
                  signup
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

export default Login