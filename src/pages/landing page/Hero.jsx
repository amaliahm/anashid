import Header from "../../Components/Header"
import { useNavigate } from "react-router-dom"

const Hero = () => {
    const navigate = useNavigate()
    return (
        <>
          <div className="py-32 px-10 mb-32 sm:mb-10">
            <div className="container my-5 p-5 px-lg-5 flex flex-col justify-between w-fit sm:h-fit lg:h-fit lg:w-4/6">
              <div className='row g-5 py-5'>
                <Header 
                  title={'“Discover the Beauty of Islamic Anashid.”'} 
                  gradient={true}
                />
              </div>
              <div className="lg:w-4/6 my-3">
                Immerse yourself in the soulful melodies of Islamic Anashid, a collection that transcends borders and languages. Our platform offers a curated selection of spiritual songs, celebrating the rich diversity of Islamic culture. Whether you're seeking tranquility, inspiration, or a deeper connection to your faith, explore and experience the harmonious blend of tradition and modernity in our vast library of Anashid
              </div>
              <div 
                className="hover:cursor-pointer capitalize bg-[var(--mainColor)] px-12 py-1 w-fit m-10 text-lg font-bold rounded-xl" 
                onClick={() => navigate('/auth/signup')}
              >
                let's start
              </div>
            </div>
          </div>
        </>
    )
}

export default Hero