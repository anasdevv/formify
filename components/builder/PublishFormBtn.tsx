import { FaIcons } from 'react-icons/fa'; // FontAwesome Icons
import { MdOutlinePublish } from 'react-icons/md'; // Outline Publish icon
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { PublishForm as PublishFormAction } from '@/actions/form';
import { toast } from '@/hooks/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';

function PublishFormBtn({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePublish = async () => {
    setLoading(true);
    try {
      console.log('id ', id);
      await PublishFormAction(id);
      router.refresh();
      toast({
        title: 'Success',
        description: 'Your form is now available to public.',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Publishing failed', error);
      toast({
        title: 'Error',
        description:
          typeof error === 'string'
            ? error
            : error?.message ?? 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <ImSpinner2 className='animate-spin h-12 w-12' />
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
          <MdOutlinePublish className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing, you will not be able
            to edit this form.
            <br />
            <br />
            <span className='font-medium'>
              By publishing this form you will make it available to the public
              and collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handlePublish}>
            Proceed {loading && <FaIcons className='animate-spin' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
