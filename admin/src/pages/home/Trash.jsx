import React, { useEffect } from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrashedItems, restoreOrDelete } from "../../redux/actions/trashActions";
import Loading from "../../components/Loading";
import { head_artists, head_categories } from "../../constant";

const Trash = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const trashedItems = useSelector((state) => state.trash.trashedItems)
  const tables = ['artists', 'categories' ]
  const heads = [head_artists, head_categories]

  useEffect(() => {
    tables.forEach(table => {
      dispatch(fetchTrashedItems(table))
    })
  }, [dispatch])

  const handleItem = (table, id, operation) => {
    console.log(table, id, operation)
    dispatch(restoreOrDelete(table, id, operation))
  }

  console.log(trashedItems['categories'])

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
                  {tables.map((table, index) => (
                    <div 
                      key={index}
                    >
                    <h2>
                      {table} Trash
                    </h2>
                    {trashedItems[table].data ? (
                        trashedItems[table].data.map(item => (
                            <table 
                              className="text-sm text-white text-center font-semibold"
                              key={item.id}
                            >
                              <thead>
                                <tr className="border-b-2">
                                  {heads[index].map((head, index) => (
                                    <th 
                                      key={index}
                                      className="py-4 px-8 capitalize text-base tracking-wide"
                                    >
                                      {head.name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              {item.map((elem, i) => (
                                <tr
                                  key={i}
                                  className="border-b border-gray-700"
                                >
                                  <td className="px-4 lg:px-32 py-4">

                                  </td>
                                </tr>
                              ))}
                                <span>{JSON.stringify(item)}</span>
                                <button onClick={() => handleRestore(table, item.id)}>Restore</button>
                                <button onClick={() => handleDelete(table, item.id)}>Delete</button>
                            </table>
                        ))
                    ) : (
                        <Loading title="No data available"/>
                    )}
                </div>
            ))}
                </div>
                trash
              </div>
            </div>
          </div>
        </>
    )
}

export default Trash