import { ChangeEvent, forwardRef } from 'react';
import { Textarea } from '../../textarea/textarea';

export interface TextareaFormFieldProps {
  value?: any[];
  onChange?: (value: any) => void;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  size?: 'xs' | 'sm' | 'md'; // textarea 높이(basic : md)
  onTransformInputValue?: (value: string) => void;
}

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const TextareaFormFieldComponent = forwardRef<HTMLTextAreaElement, TextareaFormFieldProps>(
  ({ onChange: ownerOnChange, onTransformInputValue, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (onTransformInputValue) {
        onTransformInputValue(event.target.value);
      }
      ownerOnChange?.(event.target.value);
    };
    const {
      clearAllValidators,
      addValidator,
      registerField,
      originalValues,
      onFormChange,
      fieldRefs,
      subText,
      guideText,
      getValues,
      setValue,
      onFormFocus,
      watch,
      error,
      ...newProps
    } = props as any;

    return <Textarea {...newProps} ref={ref} onChange={handleChange} />;
  },
);
export const TextareaFormField = TextareaFormFieldComponent;
