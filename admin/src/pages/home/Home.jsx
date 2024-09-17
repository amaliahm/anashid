import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";

const Home = () => {
  return (
    <div className="flex">
      <SideBarComponent ele={0} />
      <div className="flex-1">
        <NavBarComponent />
        <div className="ml-20 p-1">
          home
        </div>
      </div>
    </div>
  );
};

export default Home;
