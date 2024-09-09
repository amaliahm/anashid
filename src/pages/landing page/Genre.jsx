import Header from "../../Components/Header"
import { useNavigate } from "react-router-dom"
import { genre1, genre2, genre3 } from "../../assets/images"

const Genre = () => {
    const navigate = useNavigate()
    const genre = [ 
        {
            image: genre1,
            name: 'Madih',
        },
        {
            image: genre2,
            name: 'Nasheed',
        },
        {
            image: genre3,
            name: 'du\'a',
        },
     ]

    return (
        <>
          <div className="mt-8 sm:p-8 p-14">
            <div className="flex items-center justify-between">
                <Header title='Genre of Anshid' />
                <div 
                  className="hover:cursor-pointer capitalize text-[var(--mainColor)]"
                  onClick={() => navigate('/auth/signup')}
                >
                    see more
                </div>
            </div>
            <div className="p-12 mt-12 flex justify-between gap-12 items-start">
                {Object.keys(genre).map((e, i) => (
                    <div 
                      className="w-1/4 sm:min-h-48 md:min-h-64 lg:min-h-[400px] h-fit bg-transparent rounded-xl border-2 border-[var(--mainColor)] flex flex-col justify-evenly items-center pt-2 flex-wrap relative" 
                      key={i}
                    >
                        <div 
                          className={'bg-cover bg-center rounded-full w-36 h-36 md:w-48 md:h-48 lg:w-80 lg:h-80 relative'} 
                          style={{ backgroundImage: `url(${genre[e].image})` }}
                        >
                            <div className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-40 lg:h-40 bg-[var(--backgroundColor)] rounded-full top-1/4 right-1/4"></div>
                        </div>
                        <div className="relative text-2xl capitalize font-medium">
                            {genre[e].name}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
    )
}

export default Genre