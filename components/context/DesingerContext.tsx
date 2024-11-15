'use client';
import { FormElementInstance } from '@/components/FormElements/FormElements';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { ImSpinner2 } from 'react-icons/im';

type DesignerContextType = {
  elements: FormElementInstance[] | undefined;
  addElement: (index: number, element: FormElementInstance) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[] | undefined>>;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesingerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[] | undefined>(
    []
  );
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      // if (!prev) return;
      const newElements = [...(prev as FormElementInstance[])];
      // newElements[index] = element;
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (id: string) => {
    setElements((prev) => prev?.filter((e) => e.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      // if (!prev) return;
      const newElements = [...(prev as FormElementInstance[])];
      const index = newElements.findIndex((nel) => nel.id === id);
      newElements[index] = element;
      return newElements;
    });
  };
  // useEffect(() => {}, [elements]);
  console.log('elements ', elements);
  return (
    <DesingerContext.Provider
      value={{
        setElements,
        selectedElement,
        updateElement,
        setSelectedElement,
        addElement,
        removeElement,
        elements,
      }}
    >
      {elements === undefined && (
        <div className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 items-center justify-center'>
          <ImSpinner2 className='animate-spin h-12 w-12' />
        </div>
      )}
      {children}
    </DesingerContext.Provider>
  );
}

export function useDesignerContext() {
  const context = useContext(DesingerContext);
  if (!context) {
    throw new Error(
      'useDesignerContext must be used within a designer context'
    );
  }
  return context;
}
