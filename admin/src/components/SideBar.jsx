import React from "react";
import { sidebar } from '../assets/images/index'
import { sidebar_element } from "../constant";
import { useNavigate } from 'react-router-dom';

const SideBarComponent = ({ele}) => {
  const navigate = useNavigate()

  function handleElement (i, url) {
    // navigate(url)
  }
    return (
      <div className="h-screen w-fit lg:w-32 lg:max-w-32 text-white flex flex-col items-start justify-start py-6 px-0 space-y-6 fixed">
        <div className="text-xl font-semibold mb-8 px-1 uppercase">
          anasheed
        </div>
        <div 
          className="bg-cover bg-center w-2/3 h-5/6 flex flex-col justify-center items-center space-y-4" 
          style={{ backgroundImage: `url('${sidebar}')`}}
        >
          {sidebar_element.map((element, index) => (
            <>
              <div 
                key={index}
                className={`sidebar-icon h-12 w-12 rounded-2xl flex justify-center items-center hover:cursor-pointer ease-in-out ${index === ele ? 'bg-white' : ''}`}
                onClick={() => handleElement(index, element.to)}
              >
                <img 
                  src={index === ele ? element.clicked : element.icon}
                  alt={element.name}
                />
              </div>
              <style jsx>
                {`
                  .sidebar-icon {
                    transition: background-color 0.3s;
                  }
                `}
              </style>
            </>
          ))}
        </div>
      </div>
    );
};

export default SideBarComponent