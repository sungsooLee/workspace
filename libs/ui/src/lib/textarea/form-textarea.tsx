import { forwardRef } from 'react';
import { Textarea } from './textarea';

export interface FormTextareaComponentProps {
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
const FormTextareaComponent = forwardRef<HTMLElement, FormTextareaComponentProps>(
  ({ value, onChange: ownerOnChange, ...props }) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      ownerOnChange?.(event.target.value);
    };

    return <Textarea {...props} onChange={handleChange} />;
  },
);
export const FormTextarea = FormTextareaComponent;
