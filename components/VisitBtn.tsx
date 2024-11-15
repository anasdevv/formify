'use client';
import React from 'react';
import { Button } from './ui/button';

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <Button
      className='w-[200px]'
      onClick={() => window.open(shareUrl, '_blank')}
    >
      Visit
    </Button>
  );
};

export default VisitBtn;
