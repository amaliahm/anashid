import React from "react";

import { sidebar_elements } from "../constant";

const Sidebar = ({elem}) => {
  return (
    <div className="w-44 lg:w-64 bg-[rgba(217,217,217,0.11)] text-white py-8 flex flex-col h-screen fixed left-0 overflow-y-auto opacity-95">
      <h1 className="text-lg lg:text-2xl font-bold mx-4 mb-8 bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent capitalize">
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
      </div>
    </div>
  )
}

export default Sidebar