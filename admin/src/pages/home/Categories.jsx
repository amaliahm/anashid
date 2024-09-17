import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";

const Categories = () => {
    return (
        <>
          <div className="flex">
            <SideBarComponent ele={4} />
            <div className="flex-1">
              <NavBarComponent />
              <div className="ml-20 p-1">
                categories
              </div>
            </div>
          </div>
        </>
    )
}

export default Categories