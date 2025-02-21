import { FC, forwardRef, Fragment } from 'react';
import { Checkbox } from './checkbox';
import styles from './form-checkbox-group.module.css';

const FormCheckBoxGroupComponent = forwardRef<HTMLDivElement, any>(
  ({ value = [], onChange, checkLabel: label, options = [], name, ...props }, ref) => {
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
      <div ref={ref} className={styles.checkbox_list}>
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
export const FormCheckboxGroup = FormCheckBoxGroupComponent;
