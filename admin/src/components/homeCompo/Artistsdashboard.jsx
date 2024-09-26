import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';


const ArtistBar = ({ name, value, color }) => (
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center mr-2`}>
        10
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <span>{name}</span>
          <span>{value}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
        </div>
      </div>
    </div>
  );

  const ArtistsDashboard = ({artistsData}) => {
    return (
      <>

<div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Artists</h2>
          <div className="space-y-4">
            {artistsData.map((artist) => (
              <ArtistBar key={artist.name} {...artist} />
            ))}
          </div>
          <div className="text-right mt-2 text-blue-400">See All &gt;</div>
        </div>
      </>
    )
  }

export default ArtistsDashboard;