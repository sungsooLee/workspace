import React, { forwardRef, useEffect, useState } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { Input } from '@learnway/ui/input';

const InputFormFieldComponent = forwardRef<HTMLInputElement, BaseFormFieldProps<string>>(
  ({ formState, control, customConfig, getValues, onChange, value, ...props }, ref) => {
    const {
      clearAllValidators,
      addValidator,
      registerField,
      originalValues,
      onFormChange,
      fieldRefs,
      subText,
      guideText,
      setValue,
      onFormFocus,
      watch,
      error,
      ...newProps
    } = props;
    const placeholderWatch = useWatch({ control, name: customConfig?.placeholder?.target || '' });
    const [inputProps, setInputProps] = useState<any>(newProps);

    const handleOnChange = (e: any) => {
      console.log('e => ', e);
      onChange(e.target.value);
    };

    useEffect(() => {
      if (customConfig?.placeholder?.target && customConfig?.placeholder?.placeholder) {
        const {
          placeholder: { placeholder } } = customConfig;
        if (typeof placeholder === 'string') {
          setInputProps((state: any) => ({
            ...state,
            placeholder: t(placeholder) }));
        }
        if (typeof placeholder === 'function') {
          const placeholderFn = placeholder as (data: Record<string, any>) => string;
          setInputProps((state: any) => ({
            ...state,
            placeholder: t(placeholderFn(getValues())) }));
        }
      }
    }, [placeholderWatch]);
    useEffect(() => {
      if (inputProps.placeholder) {
        inputProps.placeholder = t(inputProps.placeholder);
        setInputProps((state: any) => ({
          ...state,
          placeholder: t(inputProps.placeholder) }));
      }
    }, []);
    return <Input ref={ref} {...inputProps} value={value} onChange={handleOnChange} />;
  },
);

export const InputFormField = InputFormFieldComponent;
