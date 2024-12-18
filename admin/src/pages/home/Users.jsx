import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns';

//COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { head_users } from "../../utils/constant.js";
import Loading from "../../components/Loading";
import AdminModal from "../../components/AdminModal";

//REDUX
import { fetchUsers } from "../../services/usersService.js";

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext.jsx";

const Users = () => {
  const { id } = useAdminContext()
  const [modal, setModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.users || {});
  const { loading, users, error } = userState;
  
  const openModal = (user) => {
    setSelectedUser(user);
    setModal(true);
  };
  
  const closeModal = () => {
    setSelectedUser('');
    dispatch(fetchUsers(id))
    setModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsers(id))
  }, [dispatch])

    return (
        <>
          <div className="flex w-screen">
            <SideBarComponent ele={1} />
            <div className="flex-1 f-full">
              <NavBarComponent id={id} />
              <div className="ml-24 p-1">
                <div className="pl-4 pr-24 lg:pl-10 lg:pr-0 pt-10 w-[65%] lg:w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2">
                    users
                  </div>
                  <div className="overflow-scroll w-10/12 lg:w-full h-[470px] oveflow-x-auto">
                    {
                      loading ? 
                      <Loading /> : 
                      error || !users || users.length === 0 ? 
                      <Loading title="No data available"/> : 
                      <table className="text-sm text-white text-center font-semibold">
                      <thead>
                        <tr className="border-b-2">
                          {head_users.map((head, index) => (
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
                      {users.map((user, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-8 py-4">
                            {user.username} 
                          </td>
                          <td className="px-8 py-4">
                            <div 
                              className="h-16 w-32 bg-[var(--grayColor)] rounded-xl bg-cover bg-center"
                              style={{ backgroundImage: `url('${user.file_path}')`}}
                            >
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            {format(new Date(user.created_at), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-8 py-4">
                            {format(new Date(user.last_login), 'yyyy-MM-dd')}
                          </td>
                          <td className="px-8 py-4">
                            {user.email}
                          </td>
                          <td className="px-8 py-4">
                            {user.listening_anasheed.toString().padStart(2, '0')}
                          </td>
                          <td className="px-8 py-4">
                            {user.playlist.toString().padStart(2, '0')}
                          </td>
                          <td className="px-8 py-4">
                          <span
                            className={`px-5 py-3 rounded-full text-white text-base capitalize ${
                              user.account_type === "admin"
                                ? "bg-[var(--greenColor)]"
                                : "bg-[var(--yellowColor)]"
                            } ${
                              user.id == id ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'
                            }
                            `}
                            onClick={() => user.id == id ? '' : openModal(user)}
                          >
                            {user.account_type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
                {modal && <AdminModal isOpen={modal} onClose={closeModal} user={selectedUser} adminId={id}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users