import React, { useState } from "react"
import { useParams } from "react-router-dom"

// COMPONENTS
import SideBarComponent from "../../components/SideBar"
import NavBarComponent from "../../components/NavBar"

// ICONS
import { bg } from "../../assets/images"
import { green_edit_icon } from "../../assets/icons"

const Profile = () => {
    const { id } = useParams()
    const [ edit, setEdit ] = useState(false)

    return (
        <>
            <div className="flex">
                <SideBarComponent ele={-1} />
                <div className="flex-1">
                    <NavBarComponent id={id} />
                    <div className="ml-24 p-0">
                        <div 
                          className="p-10 lg:pl-12 pt-10 w-full h-11/12 h-2/6 bg-cover bg-center"
                          style={{ backgroundImage: `url('${bg}')`}}
                        >
                            <div className="lg:px-24 w-full p-8 profile-div flex flex-wrap justify-center space-y-10 lg:space-x-20 lg:space-y-0 items-center border-[1px] border-[#AFAFAF]">
                                <div className="flex flex-col items-end" >
                                    <div 
                                      className="bg-gray-500 h-[420px] w-[420px] rounded-full bg-cover bg-center hover:cursor-pointer"
                                      onClick={() => setEdit(!edit)}
                                    >
                                    </div>
                                    {edit && <img 
                                      src={green_edit_icon}
                                      alt="edit"
                                      className="w-8"
                                    />}
                                </div>
                                <div className="flex items-center flex-col w-10/12 lg:w-2/4">
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent opacity-50"
                                    placeholder="Email"
                                    required
                                    disabled
                                />
                                <input
                                    type="text"
                                    className="w-full capitalize py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent opacity-50"
                                    placeholder="username"
                                    required
                                />
                                {edit && <button
                                    type="submit"
                                    className='capitalize border-[1px] border-[var(--greenColor)] text-[var(--greenColor)] font-medium px-8 py-2 my-6 rounded-3xl cursor-pointer'
                                >
                                    update photo
                                </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile