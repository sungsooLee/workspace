import { forwardRef, useEffect } from 'react';
import { Checkbox } from './checkbox';

/**
 * 공통 체크 박스
 * @param checked
 * @param onChange
 * @param props
 * @constructor
 */
const FormCheckBoxComponent = forwardRef<HTMLButtonElement, any>(
  ({ value: checked, name, onChange, checkLabel: label, ...props }, ref) => {
    useEffect(() => {
      console.log(name, checked);
    }, [checked]);
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
