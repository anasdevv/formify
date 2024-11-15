import { MdTextFields } from 'react-icons/md';
import {
  ElementType,
  FormElement,
  FormElementInstance,
} from '../FormElements/FormElements';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useDesignerContext } from '../context/DesingerContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Switch } from '../ui/switch';

const type: ElementType = 'TextField';
const extraAttributes = {
  label: 'Text Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'value here ...',
};
export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    Icon: MdTextFields,
    label: 'Text Field',
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  formElementInstance,
}: {
  formElementInstance: FormElementInstance;
}) {
  const customeElementInstance = formElementInstance as CustomInstance;
  const { helperText, label, placeholder, required } =
    customeElementInstance.extraAttributes;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label} {Boolean(required) && '*'}
      </Label>
      <Input disabled readOnly placeholder={placeholder} />
      {Boolean(helperText) && <p className='text-xs'>{helperText}</p>}
    </div>
  );
}

const propertiesFormSchema = z.object({
  label: z.string().min(2),
  helperText: z.string().max(150).optional(),
  required: z.boolean().default(false),
  placeholder: z.string().max(100).optional(),
});

type PropertiesFormSchema = z.infer<typeof propertiesFormSchema>;
function PropertiesComponent({
  formElementInstance,
}: {
  formElementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesignerContext();
  const customInstance = formElementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchema>({
    resolver: zodResolver(propertiesFormSchema),
    mode: 'onBlur',
    defaultValues: {
      ...customInstance.extraAttributes,
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, customInstance]);

  function applyChanges(values: PropertiesFormSchema) {
    updateElement(customInstance.id, {
      ...customInstance,
      extraAttributes: values,
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='space-y-3'
      >
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field.
                <br /> It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='placeholder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='helperText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helpertext</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field.
                <br />
                It will be displayed below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field.
                  <br />
                  It will be displayed below the field
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  formElementInstance,
}: {
  formElementInstance: FormElementInstance;
}) {
  const customeElementInstance = formElementInstance as CustomInstance;
  const { helperText, label, placeholder, required } =
    customeElementInstance.extraAttributes;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label} {Boolean(required) && '*'}
      </Label>
      <Input placeholder={placeholder} />
      {Boolean(helperText) && <p className='text-xs'>{helperText}</p>}
    </div>
  );
}
