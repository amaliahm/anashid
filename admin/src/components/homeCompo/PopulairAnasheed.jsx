import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

const PopulairAnasheed = ({popularAnashidData}) => {

  console.log(popularAnashidData)

  const maxNasheed = popularAnashidData.reduce((max, nasheed) => 
    nasheed.duration > max.duration ? nasheed : max, popularAnashidData[0]
  )


    return (
        <div className='rounded-3xl flex flex-col items-center bg-[var(--textColor)] hover:cursor-pointer min-w-[400px] w-[500px]'>
            <div className="p-4 rounded-2xl w-full text-[var(--secondColor)] bg-white">
                <h2 className="text-lg font-semibold mb-8 capitalize">
                    top 5 anasheed
                </h2>
                <ResponsiveContainer 
                  width="100%" 
                  height={200}
                >
                    <BarChart data={popularAnashidData}>
                        <CartesianGrid 
                          strokeDasharray="5 3" 
                          stroke="var(--secondColor)" 
                          vertical={false} 
                        />
                        <XAxis 
                          axisLine={{ stroke: "white" }} 
                          tickLine={{ stroke: "white" }} 
                          tick={{ fill: "var(--secondColor)" }}  
                          dataKey="title" 
                        />
                        <YAxis 
                          axisLine={{ stroke: "white" }} 
                          tickLine={{ stroke: "white" }} 
                          tick={{ fill: "var(--secondColor)" }}  
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} 
                          contentStyle={{ 
                            backgroundColor: 'var(--textColor)', 
                            border: 'none', 
                            borderRadius: '8px',
                            padding: '10px', 
                          }}
                          labelStyle={{ color: 'white' }}
                          itemStyle={{ color: 'white' }}
                          wrapperStyle={{ zIndex: 1000 }}
                        />
                        <Bar 
                          radius={[20, 20, 20, 20]} 
                          className="custom-bar" 
                          dataKey="duration" 
                          fill="var(--secondColor)" 
                          barSize={30} 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="flex justify-center items-center gap-5 text-xl capitalize font-semibold my-6 text-white">
                Popular One:
                <span className='text-[var(--greenColor)]'>
                    {maxNasheed.title}
                </span>
            </p>
        </div>
    )
}
export default PopulairAnasheed;