import Hero from "./Hero"
import NavBarComponent from "./NavBar"
import { hero } from "../../assets/images"

const LandingPage = () => {

  return (
    <>
      <div >
        <div class="relative">
          <img src={hero} alt="hero" className="hidden lg:block absolute top-0 right-0 w-3/6 h-auto"/>
        </div>
        <NavBarComponent />
        <main>
            <div id='home' className='p-0 mb-5'>
                <Hero />
            </div>
        </main>
        {/* footer */}
      </div>
    </>
  )
}

export default LandingPage