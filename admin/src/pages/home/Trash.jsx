import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";

const Trash = () => {
    return (
        <>
          <div className="flex">
            <SideBarComponent ele={5} />
            <div className="flex-1">
              <NavBarComponent />
              <div className="ml-20 p-1">
                trash
              </div>
            </div>
          </div>
        </>
    )
}

export default Trash