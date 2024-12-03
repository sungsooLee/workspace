import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSchemaContext,
} from '../shadcn/form';

import { DynamicFieldProps } from '../type';
import { memo, useContext } from 'react';
import { FormItemControl } from './dynamic-form-field-control';
import { useFormContext } from 'react-hook-form';

const DynamicFormField = ({ name, label, type, ...props }: DynamicFieldProps) => {
  const form = useFormContext();
  const { schema } = useContext(FormSchemaContext);
  const isRequired = schema?.shape?.[name] ? !schema.shape[name].isOptional() : false;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <FormItemControl
              field={field}
              fieldState={fieldState}
              props={{ name, label, type, ...props }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}></FormField>
  );
};

export { DynamicFormField };
