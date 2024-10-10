import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// ICONS
import new_users_icon from '../../assets/icons/new_users_icon.svg';

const NewUsers = ({newUsersData}) => {
  let totalUsers = 0
  if (newUsersData) {
    totalUsers = newUsersData.reduce((acc, curr) => acc + curr.users, 0);
  }

    return (
        <div className='rounded-3xl flex flex-col items-center min-w-[400px] w-[500px] bg-white hover:cursor-pointer'>
          <div className="p-4 rounded-2xl w-full bg-[var(--textColor)]">
            <h2 className="text-lg font-semibold mb-8 capitalize">
                new users this month
            </h2>
            {newUsersData && <ResponsiveContainer 
              width="100%" 
              height={250} 
              className='pr-3
            '>
              <LineChart data={newUsersData}>
                <XAxis 
                  tick={{ fill: "white" }} 
                  dataKey="day" 
                />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="var(--firstColor)" 
                />
              </LineChart>
            </ResponsiveContainer>}
          </div>
          <div className='flex justify-center items-center gap-5 text-xl capitalize font-semibold my-6 text-[var(--textColor)]'>
              <img 
                src={new_users_icon} 
                alt='new_users_icon'
              />
              <span className='text-2xl text-[var(--secondColor)]'>
                {totalUsers}
              </span>
              new users
          </div>
        </div>
    )
}

export default NewUsers;