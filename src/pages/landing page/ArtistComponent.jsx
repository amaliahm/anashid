import { artist1, artist2, artist5, artistArrow } from "../../assets/images"
import { useNavigate } from "react-router-dom"

const ArtistComponent = () => {
    const navigate = useNavigate()
    return (
        <>
          <div className="bg-[var(--thirdColor)] z-18 p-2 mr-3 mt-8 lg:mr-5 rounded-2xl relative">
            <img 
              className="z-17 lg-block absolute w-36 right-[30%] -top-6 lg:w-96 h-fit lg:-top-16  lg:right-[40%]"
              src={artistArrow}
              alt="artists"
            />
            <p className='capitalize font-medium text-white text-2xl lg:text-6xl md:text-5xl text-wrap text-center my-8 mx-2'>
              Meet the Voices Behind the Anashid
            </p>
            <div className="w-11/12 m-auto flex-col lg:flex-row flex justify-between items-center relative">
              <img 
                src={artist1} 
                className="w-64 h-64 lg:w-1/4 lg:h-1/4 mb-5"
              />
              <img 
                src={artist2} 
                className="w-64 h-64 lg:w-1/4 lg:h-1/4 mb-5"
              />
              <img 
                src={artist5} 
                className="w-64 h-64 lg:w-1/4 lg:h-1/4 mb-5"
              />
            </div>
          </div>
        </>
    )
}

export default ArtistComponent