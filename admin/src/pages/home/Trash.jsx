import React, { useEffect, useState } from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrashedItems, restoreOrDelete } from "../../redux/actions/trashActions";
import Loading from "../../components/Loading";
import { head_artists, head_categories } from "../../constant";
import { format } from 'date-fns';
import { green_close_icon, red_delete_icon } from "../../assets/icons";
import Modal from "../../components/Modal";

const Trash = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { trashedItems, loading, error} = useSelector((state) => state.trash)
  const tables = ['artists', 'categories' ]
  const [modal, setModal] = useState(false)
  const [selectedElem, setSelectedElem] = useState(null);
  const [operation, setOperation] = useState('')
  const [table, setTable] = useState('')
  const heads = [head_artists, head_categories]

  useEffect(() => {
    tables.forEach(table => {
      dispatch(fetchTrashedItems(table))
    })
  }, [dispatch])

  const handleItem = (table, id, operation) => {
    dispatch(restoreOrDelete(table, id, operation))
    setModal(false)
  }

  const openModal = (elem) => {
    setSelectedElem(elem)
    setModal(true)
  }

  const closeModal = () => {
    setSelectedElem('')
    tables.forEach(table => {
      dispatch(fetchTrashedItems(table))
    })
    setModal(false)
  }

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={5} />
            <div className="flex-1">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                    trash
                  </div>
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 mt-16 flex justify-between items-center">
                      categories
                    </div>
                  {/* categories */}
                  {trashedItems['categories'] ? 
                  <div>
                    <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_categories.map((head, index) => (
                            <th
                              key={index}
                              className="py-4 px-8 capitalize text-base tracking-wide"
                            >
                              {head.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {trashedItems['categories'].map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-700"
                          >
                            <td className="px-4 lg:px-32 py-4">
                              {item.name}
                            </td>
                            <td className="px-4 lg:px-32 py-4">
                              <div
                                className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center"
                                style={{ backgroundImage: `url('${item.file_path}')` }}
                              >
                              </div>
                            </td>
                            <td className="px-4 lg:px-32 py-4">
                              {item.anasheed || 0}
                            </td>
                            <td className="px-4 lg:px-32 py-4">
                              {format(new Date(item.created_at), 'yyyy-MM-dd')}
                            </td>
                            <td className="px-2 py-1">
                            <span
                              className="px-5 py-3 rounded-full text-base capitalize hover:cursor-pointer"
                            >
                              <img 
                                src={green_close_icon}
                                onClick={() => {
                                  openModal(item)
                                  setTable('categories')
                                  setOperation('restore')
                                }}
                              />
                            </span>
                          </td>
                          <td className="px-2 py-1">
                            <span
                              className="px-5 py-3 rounded-full text-base capitalize hover:cursor-pointer"
                            >
                              <img 
                                src={red_delete_icon}
                                onClick={() => {
                                  openModal(item)
                                  setTable('categories')
                                  setOperation('delete')
                                }}
                              />
                            </span>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  : <Loading  title="No data available"/>}

                    <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 mt-16 flex justify-between items-center">
                      artists
                    </div>
                  
                  {/* artists */}
                  {trashedItems['artists'] ? 
                  <div>
                    <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_artists.map((head, index) => (
                            <th
                              key={index}
                              className="py-4 px-8 capitalize text-base tracking-wide"
                            >
                              {head.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {trashedItems['artists'].map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-700"
                          >
                            <td className="px-4 lg:px-24 py-4">
                              {item.name}
                            </td>
                            <td className="px-4 lg:px-24 py-4">
                              <div
                                className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center"
                                style={{ backgroundImage: `url('${item.file_path}')` }}
                              >
                              </div>
                            </td>
                            <td className="px-4 w-[200px] py-4">
                              {item.bio}
                            </td>
                            <td className="px-4 lg:px-24 py-4">
                              {item.anasheed || 0}
                            </td>
                            <td className="px-4 lg:px-24 py-4">
                              {format(new Date(item.created_at), 'yyyy-MM-dd')}
                            </td>

                            <td className="px-2 py-1">
                            <span
                              className="px-5 py-3 rounded-full text-base capitalize hover:cursor-pointer"
                            >
                              <img 
                                src={green_close_icon}
                                onClick={() => {
                                  openModal(item)
                                  setTable('artists')
                                  setOperation('restore')
                                }}
                              />
                            </span>
                          </td>
                          <td className="px-2 py-1">
                            <span
                              className="px-5 py-3 rounded-full text-base capitalize hover:cursor-pointer"
                            >
                              <img 
                                src={red_delete_icon}
                                onClick={() => {
                                  openModal(item)
                                  setTable('artists')
                                  setOperation('delete')
                                }}
                              />
                            </span>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  : <Loading  title="No data available"/>}

                {modal && 
                  <Modal 
                    title={operation}
                    isOpen={modal} 
                    onClose={closeModal} 
                    id={selectedElem.id} 
                    name={selectedElem.name} 
                    handleDelete={() => handleItem(table, selectedElem.id, operation)}
                  />}
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Trash