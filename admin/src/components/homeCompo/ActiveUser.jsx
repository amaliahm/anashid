import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const ActiveUsersBar = ({ range, lastMonth, lastWeek, active }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{range}</span>
        <span>{lastMonth + lastWeek + active}%</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden">
        <div className="bg-red-500 h-full" style={{ width: `${lastMonth}%` }}></div>
        <div className="bg-yellow-500 h-full" style={{ width: `${lastWeek}%` }}></div>
        <div className="bg-green-500 h-full" style={{ width: `${active}%` }}></div>
      </div>
    </div>
  );

  const ActiveUser = ({activeUsersData}) => {
    return (
        <>
        <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <select className="bg-gray-700 rounded px-2 py-1">
            <option>May</option>
          </select>
        </div>
        <div className="space-y-4">
          {activeUsersData.map((data) => (
            <ActiveUsersBar key={data.range} {...data} />
          ))}
        </div>
        <div className="flex justify-between text-sm mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Last Login Month Ago
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            Last Login Week Ago
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Active User
          </div>
        </div>
      </div>
        </>
    )
  }

export default ActiveUser;