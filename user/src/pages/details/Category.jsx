import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

//COMPONENTS
import NasheedBar from "../../Components/NasheedBar"
import Loading from "../Loading"

//REDUX
import { getCategoryAnasheed } from "../../services/anasheedServices"

//CONTEXT
import { useUserContext } from "../../hooks/userContext"

const Category = () => {

  const { itemCategory } = useSelector(state => state.itemCategory)
  const { anasheed, loading, error } = useSelector(state => state.anasheed)
  const dispatch = useDispatch()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    const user = loggedinUser
    dispatch(getCategoryAnasheed(itemCategory.id, user))
  }, [])

  return (
    <div className='mb-32'>
      <h2 className="text-xl lg:text-2xl font-bold text-[var(--mainColor)] capitalize mb-8 px-2">
        {itemCategory.name}
      </h2>
      <div className='w-full h-full'> 
        {loading ? <Loading /> : error ? <Loading title='no data available' /> : <div 
          className='flex flex-col justify-center items-center gap-2 sm:gap-4 pb-2 w-full'
        >
          {Object.keys(anasheed).map((nasheed, index) => (
            <NasheedBar 
              key={index} 
              duration={anasheed[nasheed].duration}
              title={anasheed[nasheed].title}
              image={anasheed[nasheed].file_path}
              date={anasheed[nasheed].created_at}
              artist={anasheed[nasheed].artist_name}
              is_favorite={anasheed[nasheed].is_favorite}
              id={loggedinUser}
              get_data={() => {
                const user = loggedinUser
                dispatch(getCategoryAnasheed(itemCategory.id, user))
              }}
              id_nasheed={anasheed[nasheed].id}
            />
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Category