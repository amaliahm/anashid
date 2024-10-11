import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';

// REDUX
import { deleteCategory, fetchCategories, updateCategory } from "../../services/categoriesService.js";

// COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import { head_categories } from "../../utils/constant.js";
import Modal from "../../components/Modal";
import ModalUpdate from "../../components/ModalUpdate.jsx";

// ICONS
import { red_delete_icon, add_icon, green_edit_icon } from "../../assets/icons";

const Categories = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector((state) => state.categories)
  const naviagte = useNavigate()
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = (elem) => {
    setSelectedCategory(elem);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedCategory('');
    setTimeout(() => {
      dispatch(fetchCategories())
    }, 1000)
    setModal(false);
    setUpdate(false)
  };

  const handleDelete = async () => {
    dispatch(deleteCategory(selectedCategory.id))
    closeModal()
  }

  const handleUpdate = async (values) => {
    dispatch(updateCategory(values))
    closeModal()
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

    return (
        <>
          <div className="flex w-screen">
            <SideBarComponent ele={4} />
            <div className="flex-1 w-full">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                    categories
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={add_icon}
                        alt="delete"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => naviagte(`/admin/categories/add/${id}`)}
                      />
                    </div>
                  </div>
                  <div className="overflow-scroll w-11/12 lg:w-full h-[470px] oveflow-x-auto">
                    {
                      loading ? 
                      <Loading /> : 
                      error || !categories || categories.length === 0 ? 
                      <Loading title="No data available"/> : 
                      <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_categories.map((head, index) => (
                            <th 
                              className="py-4 px-8 capitalize text-base tracking-wide"
                              key={index}
                            >
                              {head.name}
                            </th>
                          ))}
                        </tr>
                    </thead>
                    <tbody>
                      {categories.map((elem, index) => (
                        <tr 
                          key={index} 
                          className={`${elem.deleted_category ? 'bg-[var(--redColor)] opacity-50' : ''} border-b border-gray-700`}
                        >
                          <td className="px-4 lg:px-24 py-4">
                            {elem.name} 
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            <div 
                              className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center" 
                              style={{ backgroundImage: `url('${elem.file_path}')`}}
                            >
                            </div>
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            {elem.anasheed_count || 0}
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            {format(new Date(elem.created_at), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_category ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_category && <img 
                                src={green_edit_icon}
                                onClick={() => {
                                  setSelectedCategory(elem)
                                  setUpdate(true)
                                }}
                              />}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_category ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_category && <img 
                                src={red_delete_icon}
                                onClick={() => openModal(elem)}
                              />}
                            </span>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
                  </div>
                {modal && 
                  <Modal 
                    title='Delete'
                    isOpen={modal} 
                    onClose={closeModal} 
                    id={selectedCategory.id} 
                    name={selectedCategory.name} 
                    handleDelete={handleDelete}
                    loading={loading}
                    error={error}
                  />}
                {update && 
                  <ModalUpdate 
                    title={selectedCategory.name} 
                    isOpen={update} 
                    onClose={closeModal} 
                    id={selectedCategory.id} 
                    name={selectedCategory.name} 
                    oldValues={{
                      name: selectedCategory.name
                    }}
                    handleUpdate={handleUpdate}
                    loading={loading}
                    error={error}
                  />}
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Categories