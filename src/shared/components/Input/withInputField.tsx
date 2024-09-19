import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

export interface WithInputFieldProps<T extends ZodType<any, ZodTypeDef, any>> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  schema?: T;
  labelAlign?: 'left' | 'center' | 'right';
  labelButton?: React.ReactNode;
  inputSuffix?: React.ReactNode;
  className?: string;
  options?: any[];
  // control?: Control<any>; // control 속성을 선택적으로 변경
  control?: any;
}

export const withInputField = <T extends ZodType<any, ZodTypeDef, any>>(
  WrappedComponent: React.ComponentType<any>
) => {
  const InputFieldHOC = ({
    name,
    label,
    required,
    schema,
    control,
    placeholder,
    labelAlign = 'left',
    labelButton,
    inputSuffix,
    options,
    className,
    ...rest
  }: WithInputFieldProps<T> & UseControllerProps<any>) => {
    const {
      field: { ref, onChange, onBlur, value, ...fieldProps },
      fieldState: { error },
    } = useController({
      name,
      control,
      ...rest,
    });
    return (
      <div className='mb-4'>
        <div
          className={`flex items-center ${labelAlign === 'right' ? 'justify-end' : labelAlign === 'center' ? 'justify-center' : ''}`}
        >
          {label && (
            <label className='mb-2 block text-sm font-bold text-gray-700'>
              {label}
              {required && <span className='text-red-500'>*</span>}
            </label>
          )}
          {labelButton && <div className='ml-2'>{labelButton}</div>}
        </div>
        <div className='relative'>
          <WrappedComponent
            {...fieldProps}
            value={value || ''}
            onBlur={onBlur}
            placeholder={placeholder}
            onChange={onChange}
            options={options}
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
          />
          {inputSuffix && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
              {inputSuffix}
            </div>
          )}
        </div>
        {error && (
          <p className='text-xs italic text-red-500'>{error.message}</p>
        )}
      </div>
    );
  };

  return InputFieldHOC;
};

export default withInputField;
