import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSchemaContext,
} from '../shadcn/form';
import { DynamicFieldProps } from '../type';
import { FormItemControl } from './dynamic-form-field-control';

const DynamicFormField = ({ name, label, type, ...props }: DynamicFieldProps) => {
  const form = useFormContext();
  const { schema } = useContext(FormSchemaContext);
  const isRequired = schema?.shape?.[name] ? !schema.shape[name].isOptional() : false;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={`group ${fieldState.error ? 'has-error' : ''}`}>
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
