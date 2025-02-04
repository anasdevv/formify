import React from 'react';
import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from '../FormElements/FormElements';

const FormElementsSidebar = () => {
  return (
    <div>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
