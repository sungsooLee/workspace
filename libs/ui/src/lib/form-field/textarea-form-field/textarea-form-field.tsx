import { ChangeEvent, forwardRef } from 'react';
import { Textarea } from '../../textarea/textarea';

export interface TextareaFormFieldProps {
  value?: any[];
  onChange?: (value: any) => void;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  disabled?: boolean;
  maxLength?: number;
  size?: 'xs' | 'sm' | 'md'; // textarea 높이(basic : md)
}

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const TextareaFormFieldComponent = forwardRef<HTMLTextAreaElement, TextareaFormFieldProps>(
  ({ value, onChange: ownerOnChange, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      ownerOnChange?.(event.target.value);
    };

    return <Textarea {...props} ref={ref} onChange={handleChange} />;
  },
);
export const TextareaFormField = TextareaFormFieldComponent;
