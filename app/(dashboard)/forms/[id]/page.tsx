import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import StatCards from '@/components/stats/StatCards';
import VisitBtn from '@/components/VisitBtn';
import invariant from 'tiny-invariant';

const FormsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log('id ', id, !!id);
  invariant(!!id && Number(id), 'Id is required');
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error('Form not found');
  }
  const visits = form.visits || 0;
  const submissions = form.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;
  console.log('form ', form);
  return (
    <>
      <div className='py-10  p-5'>
        <div className='flex justify-between  '>
          <h1 className='text-4xl font-bold truncate'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className='py-4 px-6  w-full'>
        <div className=' flex gap-2 items-center justify-between'>
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className='px-6'>
        <StatCards
          loading={false}
          data={{
            bounceRate,
            submissionRate,
            submissions,
            visits,
          }}
        />
      </div>
    </>
  );
};

export default FormsPage;
