import { artist1, artist2, artist3, artist4, artist5, artistArrow } from "../../assets/images"

const ArtistComponent = () => {
    return (
        <>
          <div className="bg-[var(--thirdColor)] z-18 p-2 mr-3 mt-8 lg:mr-5 rounded-2xl relative">
            <img 
              className="z-17 lg-block absolute w-36 right-[30%] -top-6 lg:w-96 h-fit lg:-top-16  lg:right-[40%]"
              src={artistArrow}
              alt="artists"
            />
            <p className={`capitalize font-medium text-white text-2xl lg:text-6xl md:text-5xl text-wrap text-center my-8`}>
              Meet the Voices Behind the Anashid
            </p>
            <div className="w-11/12 m-auto flex-col lg:flex-row flex justify-between items-center">
              <img src={artist1} className="w-76 h-76 mb-5"/>
              <img src={artist2} className="w-76 h-76 mb-5"/>
              <img src={artist5} className="w-76 h-76 mb-5"/>
            </div>
          </div>
        </>
    )
}

export default ArtistComponent