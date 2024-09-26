import React from 'react';

const AnasheedInCategories = ({categoriesData}) => {
    return (
      <>
        <div className="bg-white text-[var(--textColor)] p-4 rounded-lg min-w-[300px]">
          <h2 className="text-lg font-semibold mb-8 capitalize">
            anashids in each category
          </h2>
          <div className="space-y-3">
            {categoriesData.map((category) => (
              <div 
                key={category.name} 
                className="flex items-center hover:cursor-pointer"
              >
                <div className='h-16 w-16 bg-gray-500 rounded-full mr-2'></div>
                <span className='font-semibold capitalize'>
                  {category.name}
                </span>
                <span className="bg-green-500 px-6 py-2 rounded-full text-sm ml-auto font-semibold text-white">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
}

export default AnasheedInCategories;