import React from 'react';

// COMPONENTS
import Total from './Total';
import NewUsers from './NewUsers';
import PopulairAnasheed from './PopulairAnasheed';
import PopularCategories from './PopularCategories';
import AnasheedInCategories from './AnasheedInCategories';
import ArtistsDashboard from './Artistsdashboard';
import ActiveUser from './ActiveUser';

const Dashboard = () => {
  const newUsersData = [
    { date: '1 May', users: 100 },
    { date: '5 May', users: 150 },
    { date: '10 May', users: 100 },
    { date: '15 May', users: 140 },
    { date: '20 May', users: 110 },
    { date: '25 May', users: 130 },
    { date: '31 May', users: 150 },
  ];

  const popularAnashidData = [
    { name: 'Nasheed1', value: 400 },
    { name: 'Nasheed2', value: 500 },
    { name: 'Nasheed3', value: 550 },
    { name: 'Nasheed4', value: 700 },
    { name: 'Nasheed5', value: 900 },
  ];

  const categoriesData = [
    { name: 'Madih', value: 15 },
    { name: "Du'a", value: 12 },
    { name: 'Children Nasheed', value: 23 },
    { name: 'Jihad Nasheed', value: 13 },
  ];

  const artistsData = [
    { name: 'Sami Yusuf', value: 38, color: 'text-red-500' },
    { name: 'Maher Zain', value: 62, color: 'text-yellow-500' },
    { name: "ahmed boukhatir", value: 29, color: 'text-blue-500' },
  ];

  const activeUsersData = [
    { range: '21-30', lastMonth: 10, lastWeek: 15, active: 28 },
    { range: '11-20', lastMonth: 20, lastWeek: 24, active: 23 },
    { range: '1-10', lastMonth: 15, lastWeek: 30, active: 48 },
  ];

  return (
    <div className="text-white p-6 min-h-screen">
      <Total />
      <div className="flex flex-wrap items-center gap-10 justify-center mb-6">
        <NewUsers newUsersData={newUsersData} />
        <PopulairAnasheed popularAnashidData={popularAnashidData} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <PopularCategories categoriesData={categoriesData} />
        <AnasheedInCategories categoriesData={categoriesData} />
        <ArtistsDashboard artistsData={artistsData} />
      </div>
      <ActiveUser activeUsersData={activeUsersData} />
    </div>
  );
};

export default Dashboard;