import React from "react";

const Theme = ({
    // props
    add_icon, data, openModal, setAdd, setTable
}) => {


    return (
        <div className="flex flex-col">
            <div className="w-[100%] flex flex-wrap gap-6 justify-start items-center">
                {Object.keys(data.data).map((elem, i) => (
                    <div 
                      className="rounded-3xl bg-cover bg-center hover:cursor-pointer hover:opacity-50 ease-in-out duration-200 border-[1px] px-5 py-2 bg-[var(--greenColor)] border-[var(--greenColor)]"
                        onClick={() => {
                            openModal(data.data[elem])
                            setTable('theme')
                        }}
                    >
                        {data.data[elem].value}
                    </div>
                ))}
                <div 
                  className="bg-[white] p-4 rounded-xl bg-cover bg-center hover:cursor-pointer flex justify-center items-center  hover:opacity-50 ease-in-out duration-200"
                  onClick={() => {
                    setTable('theme')
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
        </div>
    );
}

export default Theme;