import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//REDUX 
import { fetchCategories } from '../services/categoriesService';
import { setItemCategory, clearItemCategory } from '../slices/itemCategorySlice';

// COMPONENTS
import Sidebar from '../Components/SideBar';
import SideBarMobile from '../Components/SideBarMobile';
import CardComponent from '../Components/Card';
import NowPlayingWrapper from '../Components/NowPlayingWrapper';
import Loading from './Loading';

const Categories = () => {

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
    <>
      <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
        <div className="hidden lg:block w-64 text-white ml-64">
          <Sidebar elem={2}/>
        </div>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
            <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
              <div className='p-4 pr-8 w-full overflow-y-auto'>
                <div className='flex mb-8 gap-6 items-center'>
                  <SideBarMobile elem={2}/>
                </div>
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
              </div>
            </div>
            <div className="w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto">
              <NowPlayingWrapper />
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

export default Categories;
