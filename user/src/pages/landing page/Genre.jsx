import Header from "../../Components/Header"
import { useNavigate } from "react-router-dom"
import { genre1, genre2, genre3, playIcon } from "../../assets/images"

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
          <div className="mt-0 p-2 lg:p-14">
            <div className="flex items-center justify-between px-6">
                <Header title='Genre of Anshid' />
                <div 
                  className="hover:cursor-pointer capitalize text-[var(--mainColor)]"
                  onClick={() => navigate('/auth/signup')}
                >
                    see more
                </div>
            </div>
            <div className="p-8 mt-10 flex flex-wrap justify-between items-center">
                {Object.keys(genre).map((e, i) => (
                    <div 
                      className="w-[28%] min-w-[200px] h-fit bg-transparent rounded-xl border-2 border-[var(--mainColor)] flex flex-col justify-between m-auto mb-7 items-center pt-2 flex-wrap relative" 
                      key={i}
                    >
                        <div 
                          className={'bg-cover bg-center rounded-full w-36 h-36 md:w-48 md:h-48 lg:w-80 lg:h-80 flex justify-center items-center'} 
                          style={{ backgroundImage: `url(${genre[e].image})` }}
                        >
                            <div className="w-14 h-14 bg-[var(--backgroundColor)] rounded-full"></div>
                        </div>
                        <div className="relative text-2xl capitalize font-medium my-4">
                            {genre[e].name}
                        </div>
                        <div 
                          className={'hover:cursor-pointer absolute bg-cover bg-center rounded-full w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 -bottom-6 right-0 lg:-bottom-14 lg:right-4'} 
                          style={{ backgroundImage: `url(${playIcon})` }}
                          onClick={() => navigate('/auth/signup')}
                        >
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
    )
}

export default Genre