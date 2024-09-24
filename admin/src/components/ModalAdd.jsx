import React, { useState } from 'react';
import axios from 'axios';

const ModalAdd = ({ table, value, setValue, loading, error, handleAdd, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-xl text-center font-bold mb-16 tracking-wider">
          Add {table}
        </h2>
        <label className="block mb-8 capitalize text-xl" htmlFor="text">
          enter the value
        </label>
        <input
          type="text"
          id="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full py-2 px-4 mb-5 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent text-lg"
        />
        {error && <p className="text-[var(--redColor)] text-lg mb-4">please try again</p>}
        <div className='flex justify-evenly items-center w-full'>

        <button
          onClick={handleAdd}
          disabled={loading || !value}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl ${loading || !value ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'} text-lg`}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
        <button 
          onClick={onClose} 
          className="capitalize text-lg border-[1px] border-[var(--mainColor)] font-medium px-8 py-2 my-6 rounded-2xl hover:cursor-pointer"
        >
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
