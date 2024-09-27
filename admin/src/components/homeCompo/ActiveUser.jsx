import React from 'react';

const ActiveUsersBar = ({ range, lastMonth, lastWeek, active }) => (
  <>
    <div className="flex justify-between text-sm mb-1 font-semibold capitalize">
      <span className='w-20'>
        {range}
      </span>
      <span className='w-fit text-nowrap' >
        rest: {100 - lastMonth - lastWeek - active}%
      </span>
    </div>
    <div className="flex h-2 rounded-full overflow-hidden bg-[#F3F6FF]">
      <div 
        className="bg-red-500 h-full rounded-full" 
        style={{ width: `${lastMonth}%` }}
      ></div>
      <div 
        className="bg-yellow-500 h-full rounded-full" 
        style={{ width: `${lastWeek}%` }}
      ></div>
      <div 
        className="bg-green-500 h-full rounded-full" 
        style={{ width: `${active}%` }}
      ></div>
    </div>
    <div className='flex justify-between w-3/4 mx-auto mt-1 font-semibold capitalize'>
      <span className='text-[var(--redColor)] '>
        {lastMonth }%
      </span>
      <span className='text-[var(--yellowColor)]'>
        {lastWeek }%
      </span>
      <span className='text-[var(--greenColor)]'>
        {active}%
      </span>
    </div>
  </>
);

const ActiveUser = ({activeUsersData}) => {
  return (
    <>
      <div className="bg-white text-[var(--textColor)] p-4 rounded-3xl ml-2">
        <div className="flex justify-start gap-8 items-center mb-8">
          <h2 className="text-lg font-semibold">
            Active Users
          </h2>
          <span className="rounded px-4 py-1 bg-[#F3F6FF] capitalize font-semibold">
            may
          </span>
        </div>
        <div className="space-y-4">
          {activeUsersData.map((data) => (
            <ActiveUsersBar key={data.range} {...data} />
          ))}
        </div>
        <div className="flex justify-between text-sm mt-4 mt-8 font-semibold capitalize">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            Last Login Month Ago
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            Last Login Week Ago
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            Active User
          </div>
        </div>
      </div>
    </>
  )
}

export default ActiveUser;