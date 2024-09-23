import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ICONS
import { logout, setting } from "../assets/icons"

// COMPONENTS
import LogoutModal from './LogoutModal'

const NavBarComponent = ({ id }) => {
  const [ modal, setModal ] = useState(false)
  const [ username, setUsername ] = useState('')
  const navigate = useNavigate()

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    if(admin) {
      setUsername(admin.username)
    }
  }, [])

  return (
    <div className="flex justify-end items-center py-2 pr-4 pl-24 w-screen border-b-[1px]">
      <div className="flex items-center space-x-2 flex-wrap">
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={logout}
            alt="logout"
            className="p-2 hover:cursor-pointer"
            onClick={() => setModal(true)}
          />
        </div>
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={setting}
            alt="setting"
            className="p-2"
          />
        </div>
        <div 
          className="flex items-center space-x-4 bg-white p-2 rounded-xl hover:cursor-pointer"
          onClick={() => navigate(`/admin/profile/${id}`)}
        >
          <div className="h-12 w-12 rounded-full bg-[var(--grayColor)]"></div>
          <span className="text-[var(--textColor)]">
            {username}
          </span>
        </div>
      </div>
      {modal && <LogoutModal isOpen={modal} onClose={closeModal} id={id}/>}
    </div>
  )
}

export default NavBarComponent