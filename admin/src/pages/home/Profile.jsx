import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// COMPONENTS
import SideBarComponent from "../../components/SideBar"
import NavBarComponent from "../../components/NavBar"
import Notification from "../../components/Notification.jsx"

// ICONS
import { bg } from "../../assets/images"
import { green_edit_icon } from "../../assets/icons"

// REDUX
import { addProfilePhoto, fetchCurrentUser } from "../../redux/reducer/profileReducer.js"

const Profile = () => {
    const { id } = useParams()
    const [ edit, setEdit ] = useState(false)
    const [ photo, setPhoto ] = useState(null)
    const dispatch = useDispatch()
    const [photoPreview, setPhotoPreview] = useState(null)
    const { user, loading, successMessage, error } = useSelector((state) => state.profile)
    const [notif, setNotif] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addProfilePhoto({
            photo: photo,
            id: id
        }))
        setNotif(true)
        setTimeout(() => {
            setNotif(false)
        }, 2000)
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        setPhoto(file)
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setPhotoPreview(previewUrl)
        }
    }

    useEffect(() => {
        dispatch(fetchCurrentUser(id))
        const intervalId = setInterval(dispatch(fetchCurrentUser(id)), 3600000);
       return () => clearInterval(intervalId);
    }, [])
    console.log(user)

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
                                      style={{ backgroundImage: `url('${photoPreview ? photoPreview : user.file_path}')`}}
                                      onClick={() => setEdit(!edit)}
                                    >
                                    </div>
                                    {edit && 
                                    <label for='images'>
                                        <img 
                                          src={green_edit_icon}
                                          alt="edit"
                                          className="w-8 hover:cursor-pointer"
                                        />
                                        <input 
                                          type="file"
                                          id="images"
                                          onChange={handlePhoto}
                                          required
                                        />
                                    </label>
                                    }
                                </div>
                                <div className="flex items-center flex-col w-10/12 lg:w-2/4">
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent opacity-50"
                                    placeholder={user.email || 'email'}
                                    disabled
                                />
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#AFAFAF] text-white placeholder-white bg-transparent opacity-50"
                                    placeholder={user.username || "username"}
                                    disabled
                                />
                                {edit && 
                                <div>
                                    <button
                                        type="submit"
                                        className='capitalize border-[1px] border-[var(--greenColor)] text-[var(--greenColor)] font-medium px-8 py-2 my-6 rounded-3xl cursor-pointer'
                                        onClick={handleSubmit}
                                    >
                                        {loading ? 'Adding...' : 'Add Photo'}
                                    </button>
                                    {error && <p className="text-[var(--redColor)]" >Error, please try again</p>}
                                    {successMessage && <p className="text-[var(--greenColor)]" >{successMessage}</p>}
                                </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {notif && successMessage && <Notification name={`Photo updated successfully`} color='var(--greenColor)' />}
            </div>
        </>
    )
}

export default Profile