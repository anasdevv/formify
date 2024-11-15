'use client';
import { Input } from './ui/input';
import { ImShare } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from './ui/button';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex flex-grow gap-4 py-2 items-center justify-between  w-full'>
      <Input value={shareUrl} readOnly />
      <Button
        className='max-w-[250px]'
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: 'Copied!',
            description: 'Link copied to clipboard',
          });
        }}
      >
        <ImShare className='mr-2 h-4 w-4' />
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
