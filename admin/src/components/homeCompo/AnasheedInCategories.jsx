import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const AnasheedInCategories = ({categoriesData}) => {
    return (
        <>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Anashids in each category</h2>
          <div className="space-y-2">
            {categoriesData.map((category) => (
              <div key={category.name} className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="bg-green-500 px-2 py-1 rounded-full text-xs">{category.value}%</span>
              </div>
            ))}
          </div>
          <div className="text-right mt-2 text-blue-400">See All &gt;</div>
        </div>
        </>
    )
}

export default AnasheedInCategories;