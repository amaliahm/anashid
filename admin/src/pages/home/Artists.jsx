import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';

// REDUX
import { fetchArtists, deleteArtist, updateArtist } from "../../services/artistsService.js";

// COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import { head_artists } from "../../utils/constant.js";
import ModalUpdate from "../../components/ModalUpdate.jsx";
import Modal from "../../components/Modal";

// ICONS
import { red_delete_icon, add_icon, green_edit_icon } from "../../assets/icons";

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext.jsx";

const Artists = () => {
  const { id } = useAdminContext()
  const dispatch = useDispatch()
  const { artists, loading, error } = useSelector((state) => state.artists)
  const naviagte = useNavigate()
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState(null);

  const openModal = (elem) => {
    setSelectedArtist(elem);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedArtist('');
    setTimeout(() => {
      dispatch(fetchArtists())
    }, 1000)
    setModal(false);
    setUpdate(false)
  };

  const handleDelete = async () => {
    dispatch(deleteArtist(selectedArtist.id));
    closeModal()
  };

  const handleUpdate = async (values) => {
    dispatch(updateArtist(values))
    closeModal()
  }

  useEffect(() => {
    dispatch(fetchArtists())
  }, [dispatch])

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={3} />
            <div className="flex-1">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center w-9/12 lg:w-full">
                    artists
                    <div className="bg-white p-2 rounded-xl flex justify-center items-center">
                      <img 
                        src={add_icon}
                        alt="delete"
                        className="p-2 hover:cursor-pointer"
                        onClick={() => naviagte(`/admin/artists/add/${id}`)}
                      />
                    </div>
                  </div>
                  <div className="overflow-scroll w-9/12 lg:w-full h-[470px] oveflow-x-auto">
                    {
                      loading ? 
                      <Loading /> : 
                      error || !artists || artists.length === 0 ? 
                      <Loading title="No data available"/> : 
                      <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_artists.map((head, index) => (
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
                      {artists.map((elem, index) => (
                        <tr key={index} className={`${elem.deleted_artist ? 'bg-[var(--redColor)] opacity-50' : ''} border-b border-gray-700`}>
                          <td className="px-4 lg:px-20 py-4">
                            {elem.artist_name} 
                          </td>
                          <td className="px-4 lg:px-20 py-4">
                            <div 
                              className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center " 
                              style={{ backgroundImage: `url('${elem.file_path}')`}}
                            >
                            </div>
                          </td>
                          <td className="px-4 lg:px-20 py-4">
                            {elem.bio}
                          </td>
                          <td className="px-4 lg:px-20 py-4">
                            {format(new Date(elem.created_at), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-4 lg:px-20 py-4">
                            {elem.anasheed.toString().padStart(2, '0')}
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_artist ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_artist && <img 
                                src={green_edit_icon}
                                onClick = {() => {
                                  setSelectedArtist(elem)
                                  setUpdate(true)
                                }}
                              />}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <span
                              className={`px-5 py-3 rounded-full text-base capitalize ${ elem.deleted_artist ? '' : 'hover:cursor-pointer'}`}
                            >
                              {!elem.deleted_artist && <img 
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
                    id={selectedArtist.id} 
                    name={selectedArtist.artist_name} 
                    handleDelete={handleDelete}
                    loading={loading}
                    error={error}
                  />}
                {update && 
                  <ModalUpdate 
                    title={selectedArtist.artist_name}
                    isOpen={update} 
                    onClose={closeModal} 
                    id={selectedArtist.id} 
                    name={selectedArtist.artist_name} 
                    oldValues={{
                      name: selectedArtist.artist_name,
                      bio: selectedArtist.bio
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

export default Artists