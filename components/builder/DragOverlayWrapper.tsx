import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementType, FormElements } from '../FormElements/FormElements';
import { useDesignerContext } from '../context/DesingerContext';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesignerContext();
  useDndMonitor({
    onDragStart: (event) => {
      console.log(event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  const isDesignerBtnElement = draggedItem?.data.current?.isDesignerBtnElement;

  let node = <div>No drag overlay</div>;
  if (isDesignerBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements?.find((e) => e.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const DesingerElementComponent =
        FormElements[element.type]?.designerComponent;
      node = (
        <div className='flex border bg-accent h-[120px] rounded-md w-full py-2 px-4 opacity-80 pointer-events-none'>
          <DesingerElementComponent formElementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
