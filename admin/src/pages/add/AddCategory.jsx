import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { add_icon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../redux/reducer/categoriesSlice";

const AddCategory = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [ name, setName ] = useState('')
  const [ photo, setPhoto ] = useState(null)
  const { categories, loading, error } = useSelector((state) => state.categories)
  const naviagte = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addCategory({
      name: name,
      photo: photo,
    }))
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
                    add category
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={add_icon}
                        alt="add"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => naviagte(`/admin/categories/add/${id}`)}
                      />
                    </div>
                  </div>
                  <div>
                  <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Upload Photo:</label>
        <input 
          type="file" 
          onChange={(e) => setPhoto(e.target.files[0])} 
          required 
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Category'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default AddCategory