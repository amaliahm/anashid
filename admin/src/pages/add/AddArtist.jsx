import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Notification from "../../components/Notification";

// ICONS
import { add_icon, close_icon } from "../../assets/icons";

// REDUX
import { addArtist } from "../../services/artistsService.js";

const AddArtist = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [ name, setName ] = useState('')
  const [bio, setBio] = useState('')
  const [ photo, setPhoto ] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const { loading, successMessage, error } = useSelector((state) => state.artists)
  const navigate = useNavigate()
  const [notif, setNotif] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addArtist({
      name: name,
      bio: bio,
      photo: photo,
    }))
    setNotif(true)
    setTimeout(() => {
      setNotif(false)
    }, 2000)
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  }

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={4} />
            <div className="flex-1">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                    add artist
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={close_icon}
                        alt="add"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => navigate(`/admin/artists/${id}`)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="flex flex-wrap justify-between items-center px-10 w-full">
                      
                        <div className="flex flex-col items-end">
                          <div 
                            className={`bg-gray-500 w-[400px] h-[400px] rounded-full bg-cover bg-center`}
                            style={{ backgroundImage: `url(${photoPreview})` }}
                          >
                          </div>
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
                        <div className="my-16 p-16 flex flex-col justify-between items-center">
                          <input 
                            className="w-[400px] py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Artist name"
                            required 
                          />
                          <textarea 
                            className="w-[400px] py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
                            type="text" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                            placeholder="Bio"
                            required 
                          />
                          <button 
                            type="submit" 
                            disabled={loading || bio.length === 0 || name.length === 0 || photo === null}
                            className={`border-[1px] border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] text-xl font-semibold ${loading || bio.length === 0 || name.length === 0 || photo === null ? 'hover:cursor-not-allowed opacity-50' : 'hover:cusor-pointer'} mb-10`}
                          >
                            {loading ? 'Adding...' : 'Add '}
                          </button>
                          {error && <p className="text-[var(--redColor)]" >please try again</p>}
                        </div>
                      </form>
                  </div>
                </div>
              </div>
            </div>
            {notif && successMessage && <Notification name={`${name} added successfully`} color='var(--greenColor)' />}
          </div>
        </>
    )
}

export default AddArtist