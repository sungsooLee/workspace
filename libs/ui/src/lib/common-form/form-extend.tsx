import { useForm, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from '../shadcn/form';

export type ExtendedFormProps<T extends z.ZodType> = {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: DefaultValues<z.infer<T>>;
  children: React.ReactNode;
  className?: string;
};

export function FormExtend<T extends z.ZodType>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
}: ExtendedFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
}
