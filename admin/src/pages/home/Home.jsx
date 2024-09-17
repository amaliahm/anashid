import React, {useState, useEffect} from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [loading])

  return (
    <>
      {loading ? 
        <Loading /> : 
        <div className="flex">
          <SideBarComponent ele={0} />
          <div className="flex-1">
            <NavBarComponent />
            <div className="ml-20 p-1">
              home
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Home;
