import React from 'react';

const colors = ['var(--redColor)', 'var(--greenColor)', 'var(--secondColor)'];

const ProgressCircle = ({ color = 'blue', value = 0 }) => {
  const radius = 38; 
  const normalizedRadius = radius - 5; 
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center justify-center relative">
      <svg height="100" width="100" className="rounded-full overflow-hidden">
        <circle
          stroke="#F3F6FF" 
          fill="transparent"
          strokeWidth="5"
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth="6"
          r={normalizedRadius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            transform: 'rotate(-90deg)', 
            transformOrigin: '50% 50%', 
          }}
        />
      </svg>
      <div className="absolute text-lg font-bold">
        {`${value}%`}
      </div>
    </div>
  );
};



const ArtistBar = ({ name, color, index, total }) => (
  <div className="flex items-center ">
    <ProgressCircle 
      color={color} 
      value={index * 100 / total} 
    />
    <div className={`rounded-full text-[${color}] flex items-center justify-center mx-4 mr-10 font-semibold text-6xl `}>
      {index}
    </div>
    <div className="flex-grow">
      <div className="flex justify-between font-bold text-base text-[#434A5E] capitalize">
        <span>
          {name}
        </span>
      </div>
    </div>
  </div>
);

const ArtistsDashboard = ({artistsData}) => {
  let totalAnasheed = 0
  if (artistsData) {
    totalAnasheed = artistsData.reduce((acc, curr) => acc + curr.anasheed_count, 0);
  }

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-3xl bg-white text-[var(--textColor)] h-[420px] overflow-y-auto">
        <h2 className="text-lg font-semibold capitalize mb-8">
          artists
        </h2>
        <div className="space-y-4">
          {artistsData && Object.keys(artistsData).map((artist, index) => (
            <ArtistBar 
              key={index} 
              name={artistsData[artist].artist_name} 
              color={colors[index]} 
              index={artistsData[artist].anasheed_count}
              total={totalAnasheed}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ArtistsDashboard;