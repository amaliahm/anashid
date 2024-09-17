import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";

const Artists = () => {
    return (
        <>
          <div className="flex">
            <SideBarComponent ele={3} />
            <div className="flex-1">
              <NavBarComponent />
              <div className="ml-20 p-1">
                artists
              </div>
            </div>
          </div>
        </>
    )
}

export default Artists