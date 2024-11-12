import { GetFormStats } from '@/actions/form';
import React from 'react';
import StatCard from './StatCard';
import { View } from 'lucide-react';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';

interface StatCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

const StatCards = ({ data, loading }: StatCardsProps) => {
  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Total Visits'
        icon={<View className='text-blue-600' />}
        helperText='All time form visits'
        className='shadow-md shadow-blue-600'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
      />
      <StatCard
        title='Total Submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText='All time form submissions'
        className='shadow-md shadow-yellow-600'
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
      />
      <StatCard
        title='Submission Rate'
        icon={<HiCursorClick className='text-green-600' />}
        helperText='Visits that results in form submission'
        className='shadow-md shadow-green-600'
        value={(data?.submissionRate.toLocaleString() || '') + ' %'}
        loading={loading}
      />
      <StatCard
        title='Bounce Rate'
        icon={<TbArrowBounce className='text-red-600' />}
        helperText='Visits that leave without interacting'
        className='shadow-md shadow-red-600'
        value={(data?.visits.toLocaleString() || '') + ' %'}
        loading={loading}
      />
    </div>
  );
};

export default StatCards;
