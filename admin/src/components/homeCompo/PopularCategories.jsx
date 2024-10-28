import React, { useState} from 'react';
import { Sector, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const colors = ['var(--greenColor)', 'var(--redColor)', 'var(--blueColor)', 'var(--yellowColor)'];

const getColor = (index) => {
  return colors[index % colors.length];
};

const renderActiveShape = (props, color) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text 
        x={cx}
        y={cy} 
        dy={8} 
        textAnchor="middle" 
        fill='#999'
        style={{ textTransform: 'capitalize' }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={color}
        cursor='pointer'
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={color}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={color} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PopularCategories = ({categoriesData, maxCategory}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

    return (
      <div className='bg-white w-[450px] min-w-[400px] rounded-3xl'>
        <div className="p-4 rounded-lg">
          <h2 className="text-lg font-semibold capitalize mb-8 text-[var(--textColor)]">
            top 5 categories 
          </h2>
          <ResponsiveContainer 
            width="100%" 
            height={260}
          >
            <PieChart 
              width={400} 
              height={400}
            >
              <Pie
                stroke='none'
                activeIndex={activeIndex}
                activeShape={(props) => renderActiveShape(props, getColor(activeIndex))}
                data={categoriesData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                onMouseEnter={onPieEnter}
                fill={(entry, index) => colors[entry % colors.length]}
              >
                {categoriesData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='text-xl font-semibold text-[var(--textColor)] text-center capitalize my-6'>
          {maxCategory.name}
        </div>
      </div>
    )
}

export default PopularCategories