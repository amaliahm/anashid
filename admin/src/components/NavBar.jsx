import { logout, setting } from "../assets/icons"

const NavBarComponent = () => {
  return (
    <div className="flex justify-end items-center py-2 pr-4 w-screen">
      <div className="flex items-center space-x-8">
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={logout}
            alt="logout"
            className="p-3"
          />
        </div>
        <div className="bg-white p-2 rounded-xl flex justify-center items-center">
          <img 
            src={setting}
            alt="setting"
            className="p-3"
          />
        </div>
        <div className="flex items-center space-x-4 bg-white p-3 rounded-xl">
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