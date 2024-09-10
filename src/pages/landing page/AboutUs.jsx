import { aboutUs } from "../../assets/images"

const AboutUs = () => {
    return (
        <>
          <div className="m-6 lg:m-16 px-4 border-[1px] border-white rounded-2xl bg-gradient-to-bl from-[#0F1421] to-[#4B2F4D] relative overflow-hidden">
            <p className='capitalize font-medium text-white text-2xl lg:text-6xl md:text-5xl text-wrap text-start my-8'>
                about us
            </p>
                <div className="lg:w-4/5 ml-4 mb-6">
                    Welcome to ANASHID DIGITALES. Our platform connects you with the rich and diverse world of Islamic Anashid. We offer a curated collection of spiritual music from various cultures and genres, designed to inspire and uplift. 
                    At ANASHID DIGITALES, we focus on quality and ease of access, providing a seamless experience with features like personalized playlists and favorites. Join us in celebrating the beauty of Islamic tradition through the power of music. Thank you for being part of our community.
                </div>
                <img 
                  className="hidden lg:block absolute w-64 h-fit right-10 top-12"
                  src={aboutUs} 
                  alt="About Us"
                />
          </div>
        </>
    )
}

export default AboutUs