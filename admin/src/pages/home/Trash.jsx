import React from "react";
import SideBarComponent from "../../components/SideBar";
import NavBarComponent from "../../components/NavBar";
import { useParams } from "react-router-dom";

const Trash = () => {
  const { id } = useParams()

    return (
        <>
          <div className="flex">
            <SideBarComponent ele={5} />
            <div className="flex-1">
              <NavBarComponent id={id} />
              <div className="ml-20 p-1">
                trash
              </div>
            </div>
          </div>
        </>
    )
}

export default Trash