import React from 'react';

const StatCard = ({ title, value }) => (
    <div className="bg-white text-[var(--textColor)] p-4 rounded-lg mx-4">
      <h2 className="text-sm font-semibold mb-6">{title}:</h2>
      <p className="text-7xl font-bold text-center">{value}</p>
    </div>
  );


const Total = ({
  total_users, total_anasheed, total_categories
}) => {

  function padNumber(num) {
    return num.toString().padStart(4, '0');
  }
    return (
        <>
         <div className="flex flex-wrap gap-4 justify-center mb-6">
           {total_users && <StatCard title="Total Users" value={padNumber(total_users)} />}
           {total_anasheed && <StatCard title="Total Anashids" value={padNumber(total_anasheed)} />}
           {total_categories && <StatCard title="Total Categories" value={padNumber(total_categories)} />}
         </div>
        </>
    )

}

export default Total