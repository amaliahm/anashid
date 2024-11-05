import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';

// COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import { head_anasheed } from "../../utils/constant.js";
import Modal from "../../components/Modal";
import ModalUpdate from "../../components/ModalUpdate.jsx";

// REDUX
import { fetchAnasheed, deleteAnasheed, updateAnasheed } from "../../services/anasheedService.js";

// ICONS
import { red_delete_icon, add_icon, green_edit_icon } from "../../assets/icons";

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext.jsx";

const Anasheed = () => {
  const { id } = useAdminContext()
  const dispatch = useDispatch()
  const { anasheed, loading, error } = useSelector((state) => state.anasheed)
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [selectedAnasheed, setSelectedAnasheeed] = useState(null);

  const openModal = (elem) => {
    setSelectedAnasheeed(elem);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedAnasheeed('');
    setTimeout(() => {
      dispatch(fetchAnasheed())
    }, 1000)
    setModal(false);
    setUpdate(false)
  };

  const handleUpdate = async (values) => {
    dispatch(updateAnasheed(values))
    closeModal()
  }

  const handleDelete = async () => {
    dispatch(deleteAnasheed(selectedAnasheed.id));
    closeModal()
  };

  useEffect(() => {
    dispatch(fetchAnasheed())
  }, [dispatch])

    return (
        <>
          <div className="flex w-screen">
            <SideBarComponent ele={2} />
            <div className="flex-1 w-full">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                    anasheed
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={add_icon}
                        alt="delete"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => navigate(`/admin/anasheed/add/${id}`)}
                      />
                    </div>
                  </div>
                  <div className="overflow-scroll w-full h-[470px] oveflow-x-auto">
                    {
                      loading ? 
                      <Loading /> : 
                      error || !anasheed || anasheed.length === 0 ? 
                      <Loading title="No data available"/> : 
                      <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_anasheed.map((head, index) => (
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
                      {anasheed.map((elem, index) => (
                        <tr key={index} className={`${elem.deleted_anasheed ? 'bg-[var(--redColor)] opacity-50' : ''} border-b border-gray-700`}>
                          <td className="px-4 lg:px-12 py-4">
                            {elem.nasheed_title} 
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <div 
                              className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center " 
                              style={{ backgroundImage: `url('${elem.file_path}')`}}
                            >
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            {elem.artist_name}
                          </td>
                          <td className="px-4 lg:px-20 py-4">
                            {elem.description}
                          </td>
                          <td className="px-4 lg:px-16 py-4">
                            {format(new Date(elem.created_at), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-4 lg:px-2 py-4">
                            {elem.listening_anasheed.toString().padStart(2, '0')}
                          </td>
                          <td className="px-4 lg:px-2 py-4">
                            {elem.favorite_anasheed.toString().padStart(2, '0')}
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_anasheed ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_anasheed && <img 
                                src={green_edit_icon}
                                onClick= {() => {
                                  setSelectedAnasheeed(elem);
                                  setUpdate(true)
                                }}
                              />}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_anasheed ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_anasheed && <img 
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
                    id={selectedAnasheed.id} 
                    name={selectedAnasheed.nasheed_title} 
                    handleDelete={handleDelete}
                    loading={loading}
                    error={error}
                  />}
                {update && 
                  <ModalUpdate 
                    title={selectedAnasheed.nasheed_title} 
                    isOpen={update} 
                    onClose={closeModal} 
                    id={selectedAnasheed.id} 
                    name={selectedAnasheed.name} 
                    oldValues={{
                      title: selectedAnasheed.title,
                      description: selectedAnasheed.description
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

export default Anasheed