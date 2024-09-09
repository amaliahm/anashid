import Hero from "./Hero"
import NavBarComponent from "./NavBar"
import { hero, circle } from "../../assets/images"
import Browse from "./Browse"
import Genre from "./Genre"

const LandingPage = () => {

  return (
    <>
      <div >
        <div className="relative">
          <img src={hero} alt="hero" className="hidden lg:block absolute top-0 right-0 w-3/6 h-auto"/>
        </div>
        <div className="relative">
          <img src={circle} alt="hero" className="absolute pt-24 top-96 left-0 w-1/12 h-auto"/>
        </div>
        <NavBarComponent />
        <main>
            <div id='home' className='p-0 mb-5'>
                <Hero />
                <Browse />
                <Genre />
            </div>
        </main>
        {/* footer */}
      </div>
    </>
  )
}

export default LandingPage