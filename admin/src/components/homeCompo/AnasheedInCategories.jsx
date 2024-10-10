import React from 'react';

const AnasheedInCategories = ({categoriesData}) => {
  let totalAnasheed = 0
  if (categoriesData) {
    totalAnasheed = categoriesData.reduce((acc, curr) => acc + curr.anasheed_count, 0);
  }

    return (
      <>
        <div className="bg-white text-[var(--textColor)] p-4 rounded-3xl min-w-[300px] h-96 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-8 capitalize">
            anashids in each category
          </h2>
          <div className="space-y-3">
          {categoriesData && Object.keys(categoriesData).map((category) => (
              <div 
                key={category.name} 
                className="flex items-center hover:cursor-pointer"
              >
                <div className='h-16 w-16 bg-gray-500 rounded-full mr-2 bg-cover bg-center' style={{ backgroundImage: `url('${categoriesData[category].file_path}')`}}></div>
                <span className='font-semibold capitalize'>
                  {categoriesData[category].name}
                </span>
                <span className="bg-green-500 px-6 py-2 rounded-full text-sm ml-auto font-semibold text-white">
                  {categoriesData[category].anasheed_count * 100 / totalAnasheed }%
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
}

export default AnasheedInCategories;