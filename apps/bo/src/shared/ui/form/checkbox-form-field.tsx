import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Checkbox } from '@learnway/ui';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import clsx from 'clsx';

interface CheckboxFormFieldProps extends BaseFormFieldProps<boolean> {
  checkConfig?: {
    reverse?: boolean;
  };
}

const CheckBoxFormFieldComponent = forwardRef<HTMLDivElement, CheckboxFormFieldProps>(
  ({ value, onChange, checkConfig }, ref) => {
    const handleOnCheckChange = (checked: boolean) => {
      onChange(checked);
    };

    return (
      <Checkbox
        className={clsx(
          checkConfig?.reverse && formStyles.checkbox, // 조건부로 추가할 클래스
        )}
        checked={value}
        onCheckedChange={handleOnCheckChange}
      />
    );
  },
);

export const CheckBoxFormField = CheckBoxFormFieldComponent;
