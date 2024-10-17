import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//CONTEXT
import { useUserContext } from "../hooks/userContext.jsx"

// ICONS
import { green_edit_icon } from "../assets/icons"

// REDUX
import { addProfilePhoto, fetchCurrentUser } from "../services/profileService.js"

const Profile = () => {
    const { loggedinUser } = useUserContext()
    const [ edit, setEdit ] = useState(false)
    const [ photo, setPhoto ] = useState(null)
    const dispatch = useDispatch()
    const [photoPreview, setPhotoPreview] = useState(null)
    const { user, loading, successMessage, error } = useSelector((state) => state.profile)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addProfilePhoto({
            photo: photo,
            id: loggedinUser
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
        dispatch(fetchCurrentUser(loggedinUser))
        const intervalId = setInterval(dispatch(fetchCurrentUser(loggedinUser)), 3600000);
        return () => clearInterval(intervalId);
    }, [])

    return (
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
                      disabled={!photoPreview}
                      className={`capitalize border-[1px] border-[var(--greenColor)] text-[var(--greenColor)] font-medium px-8 py-2 my-6 rounded-3xl ${!photoPreview ? 'opacity-50 cursor-not-allowed': 'cursor-pointer'}`}
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
    )
}

export default Profile