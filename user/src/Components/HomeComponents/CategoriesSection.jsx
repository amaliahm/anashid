import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//REDUX
import { fetchCategories } from '../../services/categoriesService';
import { setItemCategory, clearItemCategory } from '../../slices/itemCategorySlice';

//COMPONENTS
import CardComponent from '../Card';
import Loading from '../../pages/Loading';

//ICONS
import { right_arrow_icon } from '../../assets/icons';

const CategoriesSection = () => {

  const dispatch = useDispatch();
  const {categories, error, loading} = useSelector(state => state.categories);
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleItemCategory = (category) => {
    dispatch(clearItemCategory())
    dispatch(setItemCategory(category))
    navigate(`/user/categories/category/${id}`)
  }

  return (
    <div className='mb-14'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl lg:text-2xl font-semibold capitalize">
          discover 
          <span className='text-[var(--mainColor)]'> categories </span>
        </h2>
        <img 
          src={right_arrow_icon} 
          alt='see more' 
          onClick={() => navigate(`/user/categories/${id}`)}
          className='h-6 hover:cursor-pointer'
        />
      </div>
      {categories ?
      <div className='overflow-x-auto' >
        <div 
          className='flex gap-2 sm:gap-4 pb-2 w-fit'
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
            error && <Loading title="No data available"/>}
    </div>
  );
};

export default CategoriesSection;
