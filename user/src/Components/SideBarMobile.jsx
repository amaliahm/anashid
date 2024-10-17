import React, { useState } from 'react';

// COMPONENTS
import Sidebar from '../Components/SideBar';

//ICONS
import { close_sidebar_icon, menu_bar_icon } from '../assets/icons';

const SideBarMobile = ({
    elem
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="lg:hidden">
            <button
                  className="w-12 text-white p-2"
                  onClick={toggleMenu}
                >
                {isMenuOpen ? (
                  <img src={close_sidebar_icon} alt="close sidebar" />
                ) : (
                  <img src={menu_bar_icon} alt="open sidebar" />
                )}
            </button>
            <div
              className={`absolute top-0 pt-16 left-0 pl-2 w-64 text-white z-10 transition-all duration-500 ease-in-out overflow-hidden h-screen w-screen bg-[#0c121F] bg-opacity-70 hover:cursor-pointer
              ${isMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
              onClick={toggleMenu}
            >
                <Sidebar elem={elem} />
            </div>
        </div>
    )
}

export default SideBarMobile