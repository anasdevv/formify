import React from 'react';
import { Button } from '../ui/button';
import { HiSaveAs } from 'react-icons/hi';

const SaveFormBtn = () => {
  return (
    <Button className='gap-2' variant='outline'>
      Save <HiSaveAs className='h-4 w-4' />
    </Button>
  );
};

export default SaveFormBtn;
