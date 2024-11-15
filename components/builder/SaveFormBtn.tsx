import { UpdateFormContent } from '@/actions/form';
import { toast } from '@/hooks/use-toast';
import { HiSaveAs } from 'react-icons/hi';
import { useDesignerContext } from '../context/DesingerContext';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesignerContext();
  const [isPending, startTransition] = useTransition();
  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: 'Success',
        description: 'Your form has been saved',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error ', error);
      toast({
        title: 'Error',
        description:
          typeof error === 'string'
            ? error
            : error?.message ?? 'Something went wrong',
      });
    }
  };
  return (
    <Button
      className='gap-2'
      variant='outline'
      onClick={() => startTransition(updateFormContent)}
    >
      <HiSaveAs className='h-4 w-4' />
      Save
      {isPending && <FaSpinner className='animate-spin' />}
    </Button>
  );
};

export default SaveFormBtn;
