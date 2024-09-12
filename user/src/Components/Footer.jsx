import { instagram, telegram, facebook } from "../assets/images"

const Footer = () => {
    return (
        <>
          <div className="uppercase p-20 pb-8 lg:px-32 flex lg:flex-row flex-col flex-wrap justify-between items-center gap-5">
            <div className="flex flex-col justify-center items-center gap-5">
                <p className="hover:cursor-pointer text-2xl font-bold uppercase flex flex-row">
                    company
                </p>
                <p className="hover:cursor-pointer">
                    terms & conditions
                </p>
                <p className="hover:cursor-pointer">
                    privacy policy
                </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <p className="hover:cursor-pointer text-2xl font-bold uppercase">
                    menu
                </p>
                <p className="hover:cursor-pointer">
                    home
                </p>
                <p className="hover:cursor-pointer">
                    about us
                </p>
                <p className="hover:cursor-pointer">
                    signup
                </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <p className="hover:cursor-pointer text-2xl font-bold uppercase">
                    get in touch
                </p>
                <div className="flex justify-between items-center gap-6">
                    <img 
                      src={instagram} 
                      alt="instagram" 
                      className="hover:cursor-pointer w-11 h-fit" 
                    />
                    <img 
                      src={telegram} 
                      alt="telegram" 
                      className="hover:cursor-pointer w-11 h-fit"
                    />
                    <img 
                      src={facebook} 
                      alt="facebook" 
                      className="hover:cursor-pointer w-11 h-fit"
                    />
                </div>
            </div>
          </div>
        </>
    )
}

export default Footer