import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

//COMPONENTS
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import Dashboard from "../../components/homeCompo/Dashboard";

const Home = () => {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [loading])

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
              : <Dashboard />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
