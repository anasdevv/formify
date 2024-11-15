'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const ErrorPage = ({ error }: { error: Error }) => {
  console.log('error page error ', error.message);
  return (
    <div className='flex w-full h-full flex-col items-center justify-center gap-4'>
      <h2 className='text-destructive text-4xl'>Something went wrong</h2>
      {Boolean(error?.message) && <p className='text-xl '>{error.message}</p>}
      <p></p>
      <Button asChild className=''>
        <Link href='/' className='text-md p-5'>
          Go back to home{' '}
        </Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
