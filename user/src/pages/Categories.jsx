import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//REDUX 
import { fetchCategories } from '../services/categoriesService';
import { setItemCategory, clearItemCategory } from '../slices/itemCategorySlice';

// COMPONENTS
import CardComponent from '../Components/Card';
import Loading from './Loading';

//CONTEXT
import { useUserContext } from '../hooks/userContext';

const Categories = () => {

  const dispatch = useDispatch();
  const {categories, error, loading} = useSelector(state => state.categories);
  const navigate = useNavigate()
  const { loggedinUser } = useUserContext()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleItemCategory = (category) => {
    dispatch(clearItemCategory())
    dispatch(setItemCategory(category))
    navigate(`/user/categories/category/${loggedinUser}`)
  }

  return (
    <>
      <div className='mb-32'>
        <h2 className='capitalize font-semibold text-2xl lg:text-3xl text-[#F38BDC] mb-8 px-2'>
          categories
        </h2>
        {categories ? 
          <div className='w-full h-full'> 
            <div 
              className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-2 w-fit'
            >
              {Object.keys(categories).map((card, index) => (
                <div 
                  key={index} 
                  onClick={() => handleItemCategory(categories[card])}
                > 
                  <CardComponent 
                    image={categories[card].file_path}
                    title={categories[card].name} 
                    subTitle={(categories[card].anasheed_count || 0) + ' nasheed'}
                  />
                </div>
              ))}
            </div>
          </div> : 
            loading ? 
              <Loading /> : 
                error && <Loading title="No data available"/>
        }
      </div>
    </>
  );
};

export default Categories;
