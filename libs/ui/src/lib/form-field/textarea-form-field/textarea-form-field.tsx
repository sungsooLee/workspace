import { ChangeEvent, forwardRef } from 'react';
import { Textarea } from '../../textarea/textarea';

export interface TextareaFormFieldProps {
  value?: any[];
  onChange?: (value: any) => void;
}

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const TextareaFormFieldComponent = forwardRef<HTMLElement, TextareaFormFieldProps>(
  ({ value, onChange: ownerOnChange, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      ownerOnChange?.(event.target.value);
    };

    return <Textarea {...props} onChange={handleChange} />;
  },
);
export const TextareaFormField = TextareaFormFieldComponent;
