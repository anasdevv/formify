'use client';
import { FormElementInstance } from '@/components/FormElements/FormElements';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
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
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      // newElements[index] = element;
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((nel) => nel.id === id);
      newElements[index] = element;
      return newElements;
    });
  };
  return (
    <DesingerContext.Provider
      value={{
        selectedElement,
        updateElement,
        setSelectedElement,
        addElement,
        removeElement,
        elements,
      }}
    >
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
