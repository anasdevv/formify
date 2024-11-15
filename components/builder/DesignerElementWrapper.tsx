import React, { useState } from 'react';
import {
  FormElementInstance,
  FormElements,
} from '../FormElements/FormElements';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import { useDesignerContext } from '../context/DesingerContext';

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, selectedElement, setSelectedElement } =
    useDesignerContext();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const { designerComponent: DesignerElement } = FormElements[element.type];
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      id: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      id: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) return null;
  console.log(selectedElement);
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset '
    >
      <div
        ref={topHalf.setNodeRef}
        className=' h-1/2 absolute w-full rounded-t-md'
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(' h-1/2 absolute w-full rounded-b-md bottom-0')}
      ></div>
      {isMouseOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              variant={'outline'}
              className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500 hover:bg-red-600'
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary  rounded-b-none'></div>
      )}
      <div
        className={cn(
          'flex w-full h-full items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100 ',
          isMouseOver && 'opacity-30'
          //   topHalf.isOver && 'border-t-4 border-t-foreground'
        )}
      >
        <DesignerElement formInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0  w-full rounded-md h-[7px] bg-primary  rounded-t-none'></div>
      )}
    </div>
  );
};

export default DesignerElementWrapper;
