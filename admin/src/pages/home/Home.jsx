import React, {useState, useEffect} from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

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
          <div className="ml-20 p-1">
            {loading ? 
              <Loading /> 
              : <p>
                  home
                </p>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
