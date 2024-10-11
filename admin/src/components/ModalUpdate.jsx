import React, { useState } from 'react';

const ModalUpdate = ({ title, id, loading, error, isOpen, onClose, oldValues, handleUpdate }) => {
  if (!isOpen) return null;

  const [newValues, setNewValues] = useState(oldValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValues({ ...newValues, [name]: value });
  };

  const handleSubmit = () => {
    handleUpdate({
        ...newValues,
        id
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-[var(--backgroundColor)] py-24 px-8 rounded-2xl shadow-lg min-w-[500px]">
        <h2 className="text-xl text-center font-bold mb-16 tracking-wider">
          Update {title}
        </h2>
        {Object.keys(oldValues).map((key) => (
          <div key={key}>
            <label className='capitalize'>
                {key}
            </label>
            <input
              type="text"
              id="text"
              name={key}
              value={newValues[key]}
              onChange={handleChange}
              className="w-full py-2 px-4 mb-6 mt-2 rounded-lg border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent text-lg"
            />
          </div>
        ))}
        {error && <p className="text-[var(--redColor)] text-lg mb-4">please try again</p>}
        <div className='flex justify-evenly items-center w-full'>
        <button
          onClick={handleSubmit}
          disabled={loading || newValues === oldValues || Object.values(newValues).some(value => value.trim() === '')}
          className={`capitalize border-[1px] bg-white text-[var(--backgroundColor)] font-medium px-8 py-2 my-6 rounded-2xl ${loading || newValues === oldValues || Object.values(newValues).some(value => value.trim() === '') ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'} text-lg`}
        >
          {loading ? 'Updating...' : 'Update'}
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

export default ModalUpdate;
