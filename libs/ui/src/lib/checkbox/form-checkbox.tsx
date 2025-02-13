import { FC } from 'react';
import { Checkbox } from './checkbox';

/**
 * 공통 체크 박스
 * @param checked
 * @param onChange
 * @param props
 * @constructor
 */
const FormCheckBoxComponent: FC<any> = ({
  value: checked,
  onChange,
  checkLabel: label,
  ...props
}) => {
  return (
    <Checkbox
      onCheckedChange={onChange}
      checked={checked}
      {...props}
      label={label}
      hideLabel={!label}
    />
  );
};
export const FormCheckbox = FormCheckBoxComponent;
