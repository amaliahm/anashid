import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/reducer/categoriesSlice";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { red_delete_icon, add_icon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { head_categories } from "../../constant";
import { format } from 'date-fns';

const Categories = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector((state) => state.categories)
  const naviagte = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={4} />
            <div className="flex-1">
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
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-4 lg:px-32 py-4">
                            {elem.name} 
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            <div className="h-16 w-32 bg-[var(--grayColor)] rounded-xl">
                              <img
                                src={elem.file_path}
                                alt={elem.name}
                              />
                            </div>
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            {elem.anasheed || 0}
                          </td>
                          <td className="px-4 lg:px-32 py-4">
                            {format(new Date(elem.created_at), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-8 py-4">
                          <span
                            className={`px-5 py-3 rounded-full text-base capitalize hover:cursor-pointer`}
                          >
                            <img 
                              src={red_delete_icon}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Categories