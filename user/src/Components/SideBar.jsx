import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import { logoutReducer } from "../services/authService";

//elements
import { sidebar_elements } from "../utils/constant";

//CONTEXT
import { useUserContext } from "../hooks/userContext";

const Sidebar = ({elem}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth);
  const { loggedinUser } = useUserContext()

  const handleLogout = async () => {
    dispatch(logoutReducer(loggedinUser));
    navigate('/auth/login')
  };

  return (
    <div className="w-44 lg:w-64 bg-[#2D2635] lg:bg-[rgba(217,217,217,0.11)] text-white py-8 flex flex-col h-2/3 lg:h-screen fixed lg:left-0 overflow-y-auto rounded-2xl lg:rounded-none lg:opacity-95">
      <h1 className="hidden lg:block text-lg lg:text-2xl font-bold mx-4 mb-8 bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent capitalize">
        anasheed
      </h1>
      <div className="mb-8 mx-2 lg:mx-4">
        {sidebar_elements.map((element, index) => (
          <div 
            key={index} 
            className="mb-8"
          >
            <h2 className="text-xs capitalize text-[var(--mainColor)] mb-4">
              {element.title}
            </h2>
            <ul>
              {element.elements.map((el, i) => (
                <li 
                  key={i} 
                  className={`mb-4 capitalize font-semibold flex gap-1 lg:gap-3 items-center text-[${el.color}] ${el.element === elem ? 'bg-[#774F96] text-sm lg:text-xl' : ''} h-12 lg:h-14 w-40 lg:w-56 pl-2 rounded-xl hover:cursor-pointer `}
                  onClick={() => el.element === 0 ? handleLogout() : navigate(`${el.to}/${loggedinUser}`)}
                >
                  <img 
                    src={el.icon} 
                    alt={el.name} 
                    className={`${el.element === elem ? 'lg:w-7' : 'lg:w-6'}`} 
                  />
                  {el.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {error && <p className="text-red-500">Error, please try again!</p>}
        {loading && <p className="text-green-500">Processing...</p>}
      </div>
      
    </div>
  )
}

export default Sidebar