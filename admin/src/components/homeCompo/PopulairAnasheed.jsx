import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const PopulairAnasheed = ({popularAnashidData}) => {
    return (
        <div className='rounded-3xl flex flex-col items-center min-w-[400px] bg-[var(--textColor)] hover:cursor-pointer'>
            <div className="p-4 rounded-2xl w-full text-[var(--secondColor)] bg-white">
                <h2 className="text-lg font-semibold mb-8 capitalize">
                    popular anashid (today)
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
                          dataKey="name" 
                        />
                        <YAxis 
                          axisLine={{ stroke: "white" }} 
                          tickLine={{ stroke: "white" }} 
                          tick={{ fill: "var(--secondColor)" }}  
                        />
                        <Bar 
                          radius={[20, 20, 20, 20]} 
                          className="custom-bar" 
                          dataKey="value" 
                          fill="var(--secondColor)" 
                          barSize={30} 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="flex justify-center items-center gap-5 text-xl capitalize font-semibold my-6 text-white">
                Popular One:
                <span className='text-[var(--greenColor)]'>
                    nasheed
                </span>
            </p>
        </div>
    )
}
export default PopulairAnasheed;