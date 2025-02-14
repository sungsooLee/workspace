import { FC } from 'react';
import { Textarea } from './textarea';

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormTextareaComponent: FC<any> = ({ value, onChange: ownerOnChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ownerOnChange(event?.target?.value);
  };

  return <Textarea {...props} onChange={handleChange} />;
};
export const FormTextarea = FormTextareaComponent;
