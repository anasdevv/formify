import { GetForms } from '@/actions/form';
import React from 'react';
import FormCard from './FormCard';

const FormCards = async () => {
  const forms = await GetForms();
  return (
    <>
      {forms.map((f) => (
        <FormCard key={f.name} form={f} />
      ))}
    </>
  );
};

export default FormCards;
