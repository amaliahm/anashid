import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { head_users } from "../../constant";


const _users = [
  ];


const Users = () => {
    return (
        <>
          <div className="flex">
            <SideBarComponent ele={1} />
            <div className="flex-1">
              <NavBarComponent />
              <div className="ml-24 p-1">
                <div className="pl-4 pr-24 lg:pl-10 lg:pr-0 pt-10 w-[65%] lg:w-full h-2/6 overflow-scroll">
                  <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2">
                    users
                  </div>
                  <div className="overflow-scroll w-11/12 lg:w-full h-[470px]">
                    {
                      _users.length === 0 ? 
                      <p className="capitalize text-3xl text-center">
                        there's no data
                      </p> : 
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
                      {_users.map((user, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-8 py-4">
                            {user.username} 
                          </td>
                          <td className="px-8 py-4">
                            <div className="h-16 w-32 bg-[var(--grayColor)] rounded-xl">
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            {user.createdAt}
                          </td>
                          <td className="px-8 py-4">
                            {user.lastLogin}
                          </td>
                          <td className="px-8 py-4">
                            {user.email}
                          </td>
                          <td className="px-8 py-4">
                            {user.listenedAnasheed}
                          </td>
                          <td className="px-8 py-4">
                            {user.playlist}
                          </td>
                          <td className="px-8 py-4">
                          <span
                            className={`px-5 py-3 rounded-full text-white text-base capitalize ${
                              user.role === "admin"
                                ? "bg-[var(--greenColor)]"
                                : "bg-[var(--yellowColor)]"
                            }`}
                          >
                            {user.role}
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
      </div>
    </>
  )
}

export default Users