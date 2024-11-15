import React from 'react';
import { useDesignerContext } from '../context/DesingerContext';
import { FormElements } from '../FormElements/FormElements';
import { Button } from '../ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { Separator } from '../ui/separator';

const PropertiesForm = () => {
  const { selectedElement, setSelectedElement } = useDesignerContext();
  if (!selectedElement) return null;
  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;
  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-foreground/70'>Element Properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm formElementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesForm;
