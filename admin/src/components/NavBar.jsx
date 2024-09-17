import { logout, setting } from "../assets/icons"

const NavBarComponent = () => {
  return (
    <div className="flex justify-end items-center py-2 pr-4 pl-24 w-screen border-b-[1px]">
      <div className="flex items-center space-x-2 flex-wrap">
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={logout}
            alt="logout"
            className="p-2"
          />
        </div>
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={setting}
            alt="setting"
            className="p-2"
          />
        </div>
        <div className="flex items-center space-x-4 bg-white p-2 rounded-xl">
          <div className="h-12 w-12 rounded-full bg-[var(--grayColor)]"></div>
          <span className="text-[var(--textColor)]">
            username
          </span>
        </div>
      </div>
    </div>
  )
}

export default NavBarComponent