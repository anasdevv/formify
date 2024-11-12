import { GetFormStats } from '@/actions/form';
import React from 'react';
import StatCards from './StatCards';

const StatsWrapper = async () => {
  const stats = await GetFormStats();
  return <StatCards data={stats} loading={false} />;
};

export default StatsWrapper;
