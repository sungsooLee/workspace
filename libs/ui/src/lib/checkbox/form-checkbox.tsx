import { forwardRef } from 'react';
import { Checkbox } from './checkbox';

/**
 * 공통 체크 박스
 * @param checked
 * @param onChange
 * @param props
 * @constructor
 */
const FormCheckBoxComponent = forwardRef<HTMLButtonElement, any>(
  ({ value: checked, onChange, checkLabel: label, ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        onCheckedChange={onChange}
        checked={checked}
        {...props}
        label={label}
        hideLabel={!label}
      />
    );
  },
);
export const FormCheckbox = FormCheckBoxComponent;
