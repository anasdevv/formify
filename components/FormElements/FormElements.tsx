import React from 'react';
import { TextFieldFormElement } from '../fields/TextField';

export type ElementType = 'TextField';

export type FormElement = {
  type: ElementType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    Icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    formInstance: FormElementInstance;
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    formInstance: FormElementInstance;
  }>;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes: Record<string, any>;
};
