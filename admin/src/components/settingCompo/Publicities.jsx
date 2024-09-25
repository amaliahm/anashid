import React, { useState } from "react";

//COMPONENTS
import Modal from '../../components/Modal'

const Publicities = ({
    // props
    add_icon, data, handleAdd, modal, onClose, setSelected, selected, handleDelete, openModal
}) => {
    const [add, setAdd] = useState(false)
    const [ photo, setPhoto ] = useState(null)

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        setPhoto(file)
    }

    return (
        <div className="flex flex-col">
            <div className="w-[100%] flex flex-wrap gap-6 justify-start items-center">
                {Object.keys(data.data).map((elem, i) => (
                    <div 
                      className="h-40 w-64 rounded-3xl bg-cover bg-center hover:cursor-pointer hover:opacity-50 ease-in-out duration-200"
                        style={{ backgroundImage: `url('${data.data[elem].file_path}')`}}
                        onClick={() => {
                            openModal(data.data[elem])
                            setSelected(data.data[elem])
                        }}
                    >
                    </div>
                ))}
                <div 
                  className="bg-[white] p-4 rounded-xl bg-cover bg-center hover:cursor-pointer flex justify-center items-center  hover:opacity-50 ease-in-out duration-200"
                  onClick={() => {
                    setAdd(!add)
                  }}
                >
                    <label for='images'>
                        <span 
                          className="bg-white p-2 rounded-xl flex justify-center items-center"
                        >
                            <img 
                              src={add_icon}
                              alt="add"
                              className="p-2 hover:cursor-pointer"
                            />
                        </span>
                        <input 
                          type="file" 
                          id="images"
                          onChange={handlePhoto} 
                          required 
                        />
                    </label>
                </div>
            </div>
            {photo  && 
              <button
                type="submit"
                className="border-[1px] border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] text-xl font-semibold hover:cusor-pointer my-2"
                onClick={() => {
                  handleAdd('publicity', {photo: photo})
                  setTimeout(() => {
                      setPhoto('')
                  }, 1000)
                }}
              >
                { data.loading ? 'Adding..' : 'Add publicity'}
              </button>
            }
            {data.error && 
              <p className="text-[var(--redColor)]">please try again</p>
            }
            {modal && 
              <Modal 
                title='Delete'
                isOpen={modal}
                onClose={onClose}
                id={selected.id}
                name='this publicity'
                handleDelete={() => handleDelete('publicity', selected.id)}
                loading={data.loading}
                error={data.error}
              />
            }
        </div>
    );
}

export default Publicities;