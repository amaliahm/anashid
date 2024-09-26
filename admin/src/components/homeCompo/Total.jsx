import React from 'react';

const StatCard = ({ title, value }) => (
    <div className="bg-white text-[var(--textColor)] p-4 rounded-lg mx-4">
      <h2 className="text-sm font-semibold mb-6">{title}:</h2>
      <p className="text-7xl font-bold text-center">{value}</p>
    </div>
  );


const Total = () => {
    return (
        <>
         <div className="flex flex-wrap gap-4 justify-center mb-6">
           <StatCard title="Total Users" value="0000" />
           <StatCard title="Total Anashids" value="0000" />
           <StatCard title="Total Categories" value="0000" />
         </div>
        </>
    )

}

export default Total