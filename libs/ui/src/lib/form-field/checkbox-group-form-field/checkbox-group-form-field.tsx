import { forwardRef, Fragment } from 'react';
import { Checkbox } from '../../checkbox/checkbox';
import { cn } from '@learnway/shared';
import styles from './checkbox-group-form-field.module.css';

const CheckboxGroupFormFieldComponent = forwardRef<HTMLDivElement, any>(
  (
    { value = [], onChange, checkLabel: label, options = [], name, checkGroupConfig, ...props },
    ref,
  ) => {
    const handleCheckChange = (checked: boolean, checkedValue: string) => {
      let checkedValues = [...value];
      if (checked && !checkedValues.includes(checkedValue)) {
        checkedValues.push(checkedValue);
      }
      if (!checked) {
        checkedValues = checkedValues.filter((item: string) => item !== checkedValue);
      }
      onChange(checkedValues);
    };

    return (
      <div ref={ref} className={cn(styles.start, styles.checkbox_list)}>
        {options &&
          options.map((item: any) => (
            <Fragment key={item.value}>
              <Checkbox
                onCheckedChange={(checked: boolean) => handleCheckChange(checked, item.value)}
                checked={value.indexOf(item.value) >= 0}
                {...props}
                label={item.label}
                hideLabel={!item.label}
              />
            </Fragment>
          ))}
      </div>
    );
  },
);
export const CheckboxGroupFormField = CheckboxGroupFormFieldComponent;
