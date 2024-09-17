import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";

const Anasheed = () => {
    return (
        <>
          <div className="flex">
            <SideBarComponent ele={2} />
            <div className="flex-1">
              <NavBarComponent />
              <div className="ml-20 p-1">
                anasheed
              </div>
            </div>
          </div>
        </>
    )
}

export default Anasheed