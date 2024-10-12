import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';

// ICONS
import { green_edit_icon } from "../assets/icons"

// REDUX
import { addProfilePhoto, fetchCurrentUser } from "../services/profileService.js"

const Profile = () => {
    const { id } = useParams()
    const [ edit, setEdit ] = useState(false)
    const [ photo, setPhoto ] = useState(null)
    const dispatch = useDispatch()
    const [photoPreview, setPhotoPreview] = useState(null)
    const { user, loading, successMessage, error } = useSelector((state) => state.profile)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addProfilePhoto({
            photo: photo,
            id: id
        }))
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
          <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
            <div className="hidden lg:block w-60 text-white ml-64 bg-[#2D2635]" >
              <Sidebar elem={7}/>
            </div>
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
                <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
                  <div className='p-4 pr-8 w-full overflow-y-auto'>
                    <div className='flex mb-8 gap-6 items-center'>
                      <SideBarMobile elem={7}/>
                    </div>
                    <div className='mb-32'>
                      <h2 className="text-xl lg:text-2xl font-bold capitalize text-[var(--mainColor)] mb-8 px-2">
                        profile 
                      </h2>
                      <div className="pb-20">
                        <div 
                          className=" lg:pl-12 pt-10 w-full h-11/12 h-2/6"
                        >
                          <div className="lg:px-12 w-full p-8 profile-div flex flex-wrap justify-center gap-10 items-center border-[1px] border-[#AFAFAF]">
                            <div className="flex flex-col items-end" >
                              <div 
                                className="bg-gray-500 lg:h-[350px] lg:w-[350px] h-[150px] w-[150px] rounded-full bg-cover bg-center hover:cursor-pointer"
                                style={{ backgroundImage: `url('${photoPreview ? photoPreview : user.file_path}')`}}
                                onClick={() => setEdit(!edit)}
                              >
                              </div>
                              {edit && 
                                <label for='images' className="pb-10">
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
                            <div className="flex items-center flex-col w-full lg:w-2/4 lg:m-0">
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
                  </div>
                </div>
              <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
                <NowPlayingWrapper />
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Profile