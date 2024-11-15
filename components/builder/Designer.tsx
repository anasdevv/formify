'use client';

import { cn, generateId } from '@/lib/utils';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import DesingerSidebar from './DesingerSidebar';
import { ElementType, FormElements } from '../FormElements/FormElements';
import { useDesignerContext } from '../context/DesingerContext';
import DesignerElementWrapper from './DesignerElementWrapper';

function Designer() {
  const {
    addElement,
    elements,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesignerContext();
  const droppable = useDroppable({
    id: 'designer-drop-are',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      console.log('over ', over);
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      //   first case when dropping over sidebar button on the drop area
      const isDroppingOverDesignerDropArea =
        over?.data?.current?.isDesignerDropArea;
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const id = generateId();
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(id);
        addElement(elements?.length ?? 0, newElement);
        return;
      }
      //   second
      type T = {
        isBottomHalfDesignerElement?: boolean;
        isTopHalfDesignerElement?: boolean;
      };
      const {
        isBottomHalfDesignerElement = false,
        isTopHalfDesignerElement = false,
      } = over?.data?.current as T;

      const isDroppingOverDesignerElement =
        isBottomHalfDesignerElement || isTopHalfDesignerElement;
      const doppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (doppingSidebarBtnOverDesignerElement) {
        const id = generateId();
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(id);
        console.log('voer ', over.data.current);
        const overId = over?.data?.current?.id;
        const overElementIndex = elements?.findIndex((el) => el.id === overId);
        if (overElementIndex === -1 || !overElementIndex) {
          throw new Error('element not found');
        }
        let indexForNewElement = overElementIndex;
        if (isBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      //   third dragging one element over another

      const isDraggingDesignerElement =
        active?.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active?.data?.current?.elementId;
        const overId = over?.data?.current?.id;
        const activeElementIndex = elements?.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements?.findIndex((el) => el.id === overId);

        if (
          overElementIndex === -1 ||
          activeElementIndex === -1 ||
          !overElementIndex ||
          !activeElementIndex
        ) {
          throw new Error('Element not found');
        }
        const activeElement = { ...elements![activeElementIndex] };
        removeElement(activeId);
        let indexForNewElement = overElementIndex;
        if (isBottomHalfDesignerElement) {
          indexForNewElement = (overElementIndex as number) + 1;
        }
        addElement(indexForNewElement as number, activeElement);
      }
    },
  });
  return (
    <div className='flex w-full h-full'>
      <div
        className='p-4 w-full'
        onClick={(e) => {
          e.stopPropagation();
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-4 ring-inset ring-primary'
          )}
        >
          {!droppable.isOver && elements?.length === 0 && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop here
            </p>
          )}
          {droppable.isOver && elements?.length === 0 && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements && elements?.length > 0 ? (
            <div className='flex flex-col  w-full gap-2 p-4'>
              {elements?.map((el) => (
                <DesignerElementWrapper element={el} key={el.id} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <DesingerSidebar />
    </div>
  );
}

export default Designer;
