import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(4),
  desciption: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
