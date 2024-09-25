import React, { useState } from "react";

//COMPONENTS
import Modal from '../../components/Modal'
import ModalAdd from "../ModalAdd";

const Gender = ({
    // props
    add_icon, data, handleAdd, modal, onClose, setSelected, selected, handleDelete, openModal
}) => {
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')


    return (
        <div className="flex flex-col">
            <div className="w-[100%] flex flex-wrap gap-6 justify-start items-center">
                {Object.keys(data.data).map((elem, i) => (
                    <div 
                      className="rounded-3xl bg-cover bg-center hover:cursor-pointer hover:opacity-50 ease-in-out duration-200 border-[1px] px-5 py-2 bg-[var(--greenColor)] border-[var(--greenColor)]"
                        onClick={() => {
                            openModal(data.data[elem])
                            setSelected(data.data[elem])
                        }}
                    >
                        {data.data[elem].value}
                    </div>
                ))}
                <div 
                  className="bg-[white] p-4 rounded-xl bg-cover bg-center hover:cursor-pointer flex justify-center items-center  hover:opacity-50 ease-in-out duration-200"
                  onClick={() => {
                    setAdd(true)
                  }}
                >
                    <img 
                      src={add_icon}
                      alt="add"
                      className="p-2 hover:cursor-pointer"
                    />
                </div>
            </div>
            {add && 
              <ModalAdd 
                table='gender'
                value={value}
                setValue={setValue}
                loading={data.loading}
                error={data.error}
                handleAdd={() => {
                  handleAdd('gender', value)
                  setTimeout(() => {
                    setAdd(false)
                  })
                }}
                isOpen={add}
                onClose={() => setAdd(false)}
              />
            }
            {modal && 
              <Modal 
                title='Delete'
                isOpen={modal}
                onClose={onClose}
                id={selected.id}
                name={selected.value}
                handleDelete={() => handleDelete('gender', selected.id)}
                loading={data.loading}
                error={data.error}
              />
            }
        </div>
    );
}

export default Gender;