'use client';

import { toast } from '@/hooks/use-toast';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Form } from '@prisma/client';
import Link from 'next/link';
import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Designer from './builder/Designer';
import DragOverlayWrapper from './builder/DragOverlayWrapper';
import PreviewDialogBtn from './builder/PreviewDialogBtn';
import PublishFormBtn from './builder/PublishFormBtn';
import SaveFormBtn from './builder/SaveFormBtn';
import { useDesignerContext } from './context/DesingerContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

function FormBuilder({ form }: { form: Form }) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setElements } = useDesignerContext();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //px
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, //ms
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (form && form.content) {
      const ele = JSON.parse(form.content);
      console.log('setting form ');
      setElements(ele);
    }
    // setIsLoading(false);
  }, [form, form?.content, setElements]);

  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center w-full h-full'>
  //       <ImSpinner2 className='animate-spin h-12 w-12' />
  //     </div>
  //   );
  // }

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className='flex flex-col items-center justify-center h-full w-full'>
          <div className='max-w-md'>
            <h1 className='text-center text-2xl font-bold pb-2 mb-10'>
              🎉 Form Published 🎉
            </h1>
            <h2 className='text-2xl'>Share this link:</h2>
            <h3 className='text-xl text-muted-foreground'>
              Anyone with the link can view and submit.
            </h3>
            <div className='my-4 flex flex-col gap-2 pb-4'>
              <Input
                className='w-full border rounded p-2'
                value={form.shareUrl}
                readOnly
              />
              <Button
                className='mt-2 w-full bg-blue-500 text-white py-2 rounded'
                onClick={() => {
                  navigator.clipboard.writeText(form.shareUrl);
                  toast({
                    title: 'Success',
                    description: 'Link copied to clipboard!',
                  });
                  // alert('Link copied to clipboard!');
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className='flex justify-between w-full'>
              <Button asChild variant={'link'}>
                <Link href={'/'} className='gap-2'>
                  Go back home
                  <BsArrowLeft />
                </Link>
              </Button>
              <Button variant={'link'} asChild className='flex-nowrap'>
                <Link href={`/forms/${form.id}`} className='gap-2'>
                  Form Details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
