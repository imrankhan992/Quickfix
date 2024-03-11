import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  
];

export function AreaChartHero() {
  return (
    <AreaChart
      data={chartdata}
      categories={['SemiAnalysis', 'The Pragmatic Engineer']}
      colors={['indigo', 'rose']}
    />
  );
}
