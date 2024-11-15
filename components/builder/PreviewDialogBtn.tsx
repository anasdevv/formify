import React from 'react';
import { Button } from '../ui/button';
import { MdPreview } from 'react-icons/md';

const PreviewDialogBtn = () => {
  return (
    <Button className='gap-2' variant='outline'>
      Preview
      <MdPreview className='h-6 w-6' />
    </Button>
  );
};

export default PreviewDialogBtn;
