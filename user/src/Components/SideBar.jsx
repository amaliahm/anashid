import React from "react";

import { sidebar_elements } from "../constant";

const Sidebar = ({elem}) => {
  return (
    <div className="w-64 bg-[rgba(217,217,217,0.11)] text-white py-8 flex flex-col h-screen fixed left-0 overflow-y-auto opacity-95">
      <h1 className="text-2xl font-bold mx-4 mb-8 bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent capitalize">
        anasheed
      </h1>
      <div className="mb-8 mx-4">
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
                  className={`mb-4 capitalize font-semibold flex gap-3 items-center text-[${el.color}] ${el.element === elem ? 'bg-[#774F96] text-xl' : ''} h-14 w-56 px-2 rounded-xl hover:cursor-pointer`}
                >
                  <img 
                    src={el.icon} 
                    alt={el.name} 
                    className={`${el.element === elem ? 'w-7' : 'w-6'}`} 
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