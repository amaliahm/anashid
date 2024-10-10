import React from 'react';

// COMPONENTS
import Total from './Total';
import NewUsers from './NewUsers';
import PopulairAnasheed from './PopulairAnasheed';
import PopularCategories from './PopularCategories';
import AnasheedInCategories from './AnasheedInCategories';
import ArtistsDashboard from './Artistsdashboard';
import ActiveUser from './ActiveUser';

const Dashboard = ({
  data
}) => {

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

  return (
    <div className="text-white p-6 min-h-screen">
      <Total total_users={data.total_users} total_anasheed={data.total_anasheed} total_categories={data.total_categories} />
      <div className="flex flex-wrap items-center gap-10 justify-center mb-6">
        <NewUsers newUsersData={data.new_users} />
        <PopulairAnasheed popularAnashidData={popularAnashidData} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <PopularCategories categoriesData={categoriesData} />
        <AnasheedInCategories categoriesData={data.anasheed_into_categories} />
        <ArtistsDashboard artistsData={data.artists} />
      </div>
      <ActiveUser activeUsersData={data.active_users} />
    </div>
  );
};

export default Dashboard;