import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import Dashboard from "../../components/homeCompo/Dashboard";

//REDUX
import { fetchData } from "../../services/homeService.js";

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext.jsx";

const Home = () => {
  const { id } = useAdminContext()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <>
      <div className="flex">
        <SideBarComponent ele={0} />
        <div className="flex-1">
          <NavBarComponent id={id} />
          <div className="ml-24 p-1">
            <div className="px-4 lg:pl-10 pt-10 w-full h-2/6 overflow-scroll">
              <div className="text-xl lg:text-3xl capitalize font-semibold pl-2 mb-2 flex justify-between items-center">
                dashboard
              </div>
            </div>
            {loading ? 
              <Loading /> 
              : <Dashboard data={data} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
