import { useDesignerContext } from '../context/DesingerContext';
import FormElementsSidebar from './FormElementsSidebar';
import PropertiesForm from './PropertiesForm';

function DesignerSidebar() {
  const { selectedElement } = useDesignerContext();
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {selectedElement ? <PropertiesForm /> : <FormElementsSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
