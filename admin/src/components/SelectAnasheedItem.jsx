import React, { useState } from 'react';

const SelectedAnasheedItem = ({ label, options, selectedValue, onSelect, name = 'value' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item) => {
    onSelect(item); 
    setIsOpen(false); 
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          type="button" 
          className="inline-flex justify-center items-center w-full rounded-3xl border shadow-sm px-5 py-3 text-sm font-medium text-[#DEEBEE] border-[1px] border-[#DEEBEE] hover:bg-gray-800 focus:outline-none"
          onClick={toggleDropdown}
        >
          <div 
            className='w-10 h-10 rounded-full bg-gray-500 mr-2 bg-center bg-cover'
            style={{ backgroundImage: `url(${selectedValue ? selectedValue.file_path : ''})` }}
          ></div>
          {selectedValue ? selectedValue[name] : label}
          <svg 
            className="-mr-1 ml-2 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div 
          className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out"
          role="menu" 
          aria-orientation="vertical" 
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((item) => (
              <span 
                key={item.id} 
                href="" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer" 
                role="menuitem" 
                onClick={() => handleItemClick(item)}
              >
                {item[name]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedAnasheedItem;
