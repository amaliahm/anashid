import { browseCircle, playlistCreate, heartCreate } from "../../assets/images"
import Header from "../Header"

const CreateSection = () => {
  return (
    <>
      <div className="lg:pt-10 overflow-hidden p-0">  
        <div className="relative">
          <img src={browseCircle} alt="hero" className="hidden lg:block absolute bottom-0 right-20 w-1/12 h-auto"/>
          <img src={heartCreate} alt="hero" className="hidden lg:block absolute top-4 right-36 w-1/12 h-auto"/>
          <img src={playlistCreate} alt="hero" className="hidden lg:block absolute bottom-4 right-80 w-1/12 h-auto"/>
          <div className="bg-[rgba(113,60,150,0.24)] rounded-2xl lg:m-20 m-5 mt-0 py-3 px-5 pb-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between items-start">
            <Header title='Create Playlists & Save Favorites' />
            <div className="lg:px-12 px-6 pt-8 lg:w-3/4"> 
              Enhance your spiritual journey by curating your own playlists or marking Anashid as favorites. Whether you wish to revisit your most cherished songs or craft a playlist for different moods or occasions, our platform gives you the tools to personalize your listening experience. Save your favorites and keep them close at heart, all in one convenient place.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSection