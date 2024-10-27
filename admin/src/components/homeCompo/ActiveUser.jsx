import React from 'react';

const ActiveUsersBar = ({ title, color, value, total }) => (
  <>
    <div className="flex justify-between text-sm mb-1 font-semibold capitalize">
      <span className='w-fit'>
        {title}
      </span>
      <span className='w-fit text-nowrap' >
        {value * 100 / total}% ({value})
      </span>
    </div>
    <div className="flex h-2 rounded-full overflow-hidden bg-[#F3F6FF]">
      <div 
        className={`" h-full rounded-full`}
        style={{ width: `${value * 100 / total}%`, backgroundColor: `${color}`}}
      ></div>
    </div>
  </>
);

const ActiveUser = ({activeUsersData}) => {
  let total = 0
  if (
    activeUsersData && activeUsersData.logged_in_last_month && activeUsersData.logged_in_last_two_months && activeUsersData.logged_in_last_week && activeUsersData.logged_in_today
  ) {

    total = parseInt(activeUsersData.logged_in_last_month, 10) + parseInt(activeUsersData.logged_in_last_two_months, 10) + parseInt(activeUsersData.logged_in_last_week, 10) + parseInt(activeUsersData.logged_in_today, 10)
  }

  return (
    <>
      <div className="bg-white text-[var(--textColor)] p-4 rounded-3xl ml-2">
        <div className="flex justify-start gap-8 items-center mb-8">
          <h2 className="text-lg font-semibold">
            Active Users
          </h2>
          <span className="rounded px-4 py-1 bg-[#F3F6FF] capitalize font-semibold">
            last 2 months
          </span>
        </div>
        {activeUsersData && <div className="space-y-4">
            {activeUsersData.logged_in_today  && <ActiveUsersBar title="active users" color='var(--greenColor)' value={activeUsersData.logged_in_today } total={total} />}
            {activeUsersData.logged_in_last_week && <ActiveUsersBar title="last login week ago" color='green' value={activeUsersData.logged_in_last_week} total={total}  />}
            {activeUsersData.logged_in_last_month && <ActiveUsersBar title="last login month ago" color='#356CF9' value={activeUsersData.logged_in_last_month} total={total} />}
            {activeUsersData.logged_in_last_two_months && <ActiveUsersBar title="last login 2 months ago" color='var(--redColor)' value={activeUsersData.logged_in_last_two_months} total={total} />}
          
        </div>}
      </div>
    </>
  )
}

export default ActiveUser;