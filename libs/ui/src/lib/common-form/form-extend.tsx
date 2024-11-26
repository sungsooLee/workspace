import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ExtendedFormProps } from './type';
import { Form } from '../form/form';

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
