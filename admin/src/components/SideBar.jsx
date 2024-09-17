import React from "react";
import { sidebar } from '../assets/images/index'
import { sidebar_element } from "../constant";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const SideBarComponent = ({ele}) => {
  const navigate = useNavigate()
  const params = useParams()
  console.log(params.id)

  function handleElement (i, url) {
    navigate(`${url}/${params.id}`)
  }
    return (
      <div className="h-screen w-fit lg:w-32 lg:max-w-32 text-white flex flex-col items-start justify-start py-6 px-0 space-y-6 fixed bg-[var(--backgroundColor)]">
        <div className="text-base font-semibold mb-8 px-4 uppercase">
          anasheed
        </div>
        <div 
          className="bg-cover bg-center w-2/3 lg:w-3/5 h-5/6 flex flex-col justify-center items-center space-y-4" 
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