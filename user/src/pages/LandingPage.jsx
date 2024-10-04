import Hero from "../Components/landingPageComponents/Hero"
import NavBarComponent from "../Components/NavBar"
import { hero, circle } from "../assets/images"
import Browse from "../Components/landingPageComponents/Browse"
import Genre from "../Components/landingPageComponents/Genre"
import CreateSection from "../Components/landingPageComponents/CreateSection"
import ArtistComponent from "../Components/landingPageComponents/ArtistComponent"
import AboutUs from "../Components/landingPageComponents/AboutUs"
import Footer from "../Components/Footer"

const LandingPage = () => {

  return (
    <>
      <div >
        <div className="relative">
          <img src={hero} alt="hero" className="hidden lg:block absolute top-0 right-0 w-3/6 h-auto"/>
        </div>
        <div className="relative">
          <img src={circle} alt="hero" className="absolute lg:pt-24 pt-80 top-96 left-0 w-1/12 h-auto"/>
        </div>
        <NavBarComponent />
        <main>
            <div id='home' className='p-0 mb-5'>
                <Hero />
                <Browse />
                <Genre />
                <CreateSection />
                <ArtistComponent />
            </div>
            <div id='about-us' className='p-0 mb-5'>
              <AboutUs />
            </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default LandingPage