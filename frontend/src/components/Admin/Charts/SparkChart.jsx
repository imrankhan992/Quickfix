import { SparkAreaChart, SparkBarChart, SparkLineChart } from '@tremor/react';

const chartdata = [
  {
    month: 'Jan 21',
    Performance: 4000,
    Benchmark: 3000,
  },
  {
    month: 'Feb 21',
    Performance: 3000,
    Benchmark: 2000,
  },
  {
    month: 'Mar 21',
    Performance: 2000,
    Benchmark: 1700,
  },
  {
    month: 'Apr 21',
    Performance: 2780,
    Benchmark: 2500,
  },
  {
    month: 'May 21',
    Performance: 1890,
    Benchmark: 1890,
  },
  {
    month: 'Jun 21',
    Performance: 2390,
    Benchmark: 2000,
  },
  {
    month: 'Jul 21',
    Performance: 3490,
    Benchmark: 3000,
  },
];

export const SparkChart = () => {
  return (
    <div className='p-4  overflow-hidden flex items-center justify-center w-full'>
    
      <SparkBarChart
        data={chartdata}
        index="date"
        categories={['Performance', 'Benchmark']}
        colors={['green', 'yellow']}
      />
    </div>
  );
};