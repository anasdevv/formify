import React from 'react';
import { Button } from '../ui/button';
import { MdPreview } from 'react-icons/md';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { useDesignerContext } from '../context/DesingerContext';
import { FormElements } from '../FormElements/FormElements';

const PreviewDialogBtn = () => {
  const { elements } = useDesignerContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='gap-2'>
          <MdPreview className='h-6 w-6' />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <p className='text-lg font-bold text-muted-foreground'>
            Form preview
          </p>
          <p className='text-sm text-muted-foreground'>
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')]">
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
            {elements?.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} formElementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
