import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react';
import invariant from 'tiny-invariant';

const BuilderPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log('id ', id, !!id);
  invariant(!!id && Number(id), 'Id is required');
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error('Form not found');
  }
  console.log('form ', form);
  return <FormBuilder form={form} />;
};

export default BuilderPage;
