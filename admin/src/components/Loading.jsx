import React from 'react';

//ICONS
import { loader } from '../assets/icons';

const Loading = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-white mt-2">
      { title || 'Loading' }
    </h1>
  </div>
);

export default Loading;