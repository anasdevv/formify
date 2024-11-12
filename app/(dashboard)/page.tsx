import CreateForm from '@/components/CreateForm';
import FormCards from '@/components/forms/FormCards';
import FormCardSkeleton from '@/components/forms/FormCardSkeleton';
import StatCards from '@/components/stats/StatCards';
import StatsWrapper from '@/components/stats/StatsWrapper';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='p-4'>
      <Suspense fallback={<StatCards loading={true} />}>
        <StatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Your forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateForm />
        <Suspense
          fallback={[1, 2, 3, 4].map((f) => (
            <FormCardSkeleton key={f} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
