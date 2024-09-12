import Header from "../../Components/Header"
import { browseCircle } from "../../assets/images"

const Browse = () => {
    return (
      <div className="lg:pt-10 overflow-hidden p-0">  
        <div className="relative">
          <img src={browseCircle} alt="hero" className="hidden lg:block absolute bottom-0 right-20 w-1/12 h-auto"/>
          <div className="bg-[rgba(113,60,150,0.24)] rounded-2xl lg:m-20 m-5 mt-0 py-3 px-5 pb-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between items-center">
            <Header title='Browse by Language, Theme, or Popularity' />
            <div className="lg:px-24 md:px-16 px-6 pt-8"> 
                Navigate through a vast library of Islamic Anashid by filtering content based on your preferences. Whether you want to listen by language, delve into specific themes, or discover what's trending, our intuitive categorization allows you to easily find the Anashid that resonate with your soul. Experience seamless browsing and find your favorite spiritual melodies in just a few clicks
            </div>
          </div>
        </div>
      </div>
    )
}

export default Browse