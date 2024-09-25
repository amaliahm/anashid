import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import SelectedAnasheedItem from "../../components/SelectAnasheedItem";
import UploadMusic from '../../components/UploadMusic'

// ICONS
import { add_icon, close_icon } from "../../assets/icons";

// REDUX
import { fetchCategories } from "../../redux/reducer/categoriesSlice";
import { fetchTableData } from "../../redux/actions/settingsAction";
import { fetchArtists } from "../../redux/reducer/artistsSlice";
import { addAnasheed } from "../../redux/reducer/anasheedSlice";

const AddAnasheed = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ title, setTitle ] = useState('')
  const [description, setDescription] = useState('')

  const [ photo, setPhoto ] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [musicFile, setMusicFile] = useState(null);
  const [musicDuration, setMusicDuration] = useState(null);

  const { anasheed, loading, successMessage, error } = useSelector((state) => state.anasheed)
  const { categories } = useSelector((state) => state.categories)
  const { artists } = useSelector((state) => state.artists)
  const tables = useSelector((state) => state.settings)
  
  const [selectedValues, setSelectedValues] = useState({
    category: null,
    theme: null,
    language: null,
    gender: null,
    artist: null
  });

  const handleSelect = (key, selectedItem) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [key]: selectedItem
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addAnasheed({
        title,
        description,
        duration: musicDuration,
        id_category: selectedValues.category.id,
        id_theme: selectedValues.theme.id,
        id_language: selectedValues.language.id,
        id_artist: selectedValues.artist.id,
        id_gender: selectedValues.gender.id,
        audio: musicFile,
        photo: photo
    }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchTableData('theme'))
    dispatch(fetchTableData('gender'))
    dispatch(fetchTableData('language'))
    dispatch(fetchArtists())
  }, [dispatch])

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={2} />
            <div className="flex-1">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                    add anasheed
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={close_icon}
                        alt="add"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => navigate(`/admin/anasheed/${id}`)}
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
                          
                          <div className="capitalize mt-5 w-full">
                            upload onshoda
                            <UploadMusic musicFile={musicFile} setMusicFile={setMusicFile} musicDuration={musicDuration} setMusicDuration={setMusicDuration} />
                          </div>
                        </div>
                        <div className="my-16 p-16 flex flex-col justify-between items-center">
                          <input 
                            className="w-[400px] py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Anasheed title"
                            required 
                          />
                          <textarea 
                            className="w-[400px] py-2 px-4 mb-5 rounded-3xl border-[1px] border-[#DEEBEE] bg-[#DEEBEE] text-[var(--textColor)] placeholder-[var(--textColor)] font-base"
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Anasheed description"
                            required 
                          />
                          <div className="flex flex-col items-center space-y-4 w-full">
                            <SelectedAnasheedItem 
                              label="Select category" 
                              options={categories} 
                              selectedValue={selectedValues.category} 
                              onSelect={(item) => handleSelect('category', item)} 
                              name='name'
                            />
                            <SelectedAnasheedItem 
                              label="Select theme" 
                              options={tables.tables.theme.data} 
                              selectedValue={selectedValues.theme} 
                              onSelect={(item) => handleSelect('theme', item)} 
                            />
                            <SelectedAnasheedItem 
                              label="Select language" 
                              options={tables.tables.language.data} 
                              selectedValue={selectedValues.language} 
                              onSelect={(item) => handleSelect('language', item)} 
                            />
                            <SelectedAnasheedItem 
                              label="Select gender" 
                              options={tables.tables.gender.data} 
                              selectedValue={selectedValues.gender} 
                              onSelect={(item) => handleSelect('gender', item)} 
                            />
                            <SelectedAnasheedItem 
                              label="Select Artist" 
                              options={artists} 
                              selectedValue={selectedValues.artist} 
                              onSelect={(item) => handleSelect('artist', item)} 
                              name='name'
                            />
                            
                            </div>
                          <button 
                            type="submit" 
                            disabled={
                                loading || selectedValues.artist === null || selectedValues.category === null || selectedValues.gender === null || selectedValues.language === null || selectedValues.theme === null ||  musicDuration === null || musicFile === null || description.length === 0 || title.length === 0 || photo === null
                            }
                            className={
                                `border-[1px] capitalize my-5 border-[var(--greenColor)] rounded-3xl px-12 py-2 text-[var(--greenColor)] text-xl font-semibold 
                                ${selectedValues.artist === null || selectedValues.category === null || selectedValues.gender === null || selectedValues.language === null || selectedValues.theme === null ||  musicDuration === null || musicFile === null || description.length === 0 || title.length === 0 || photo === null 
                                    ? 'hover:cursor-not-allowed opacity-50' 
                                    : 'hover:cusor-pointer'} mb-10`
                                }
                          >
                            {loading ? 'Adding...' : 'Add '}
                          </button>
                          {error && <p className="text-[var(--redColor)] capitalize" >please try again</p>}
                          {successMessage && <p className="text-[var(--greenColor)] capitalize" >audio uploaded successfully</p>}
                        </div>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default AddAnasheed