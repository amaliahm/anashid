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

  return (
    <div className="text-white p-6 min-h-screen">
      {data.total_users && data.total_anasheed && data.total_categories && <Total total_users={data.total_users} total_anasheed={data.total_anasheed} total_categories={data.total_categories} />}
      <div className="flex flex-wrap items-center gap-10 justify-center mb-6">
        {data.new_users && <NewUsers newUsersData={data.new_users} />}
        {data.popularAnasheed && <PopulairAnasheed popularAnashidData={data.popularAnasheed} />}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {data.popularCategories && data.maxCategory && <PopularCategories categoriesData={data.popularCategories} maxCategory={data.maxCategory} />}
        {data.anasheed_into_categories && <AnasheedInCategories categoriesData={data.anasheed_into_categories} />}
        {data.artists && <ArtistsDashboard artistsData={data.artists} />}
      </div>
      {data.active_users && <ActiveUser activeUsersData={data.active_users} />}
    </div>
  );
};

export default Dashboard;