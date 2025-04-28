import { forwardRef, Fragment, useEffect, useState } from 'react';
import { Checkbox } from '../../checkbox/checkbox';
import { cn } from '@learnway/shared';
import styles from './checkbox-group-form-field.module.css';

const CheckboxGroupFormFieldComponent = forwardRef<HTMLDivElement, any>(
  (
    { value = [], onChange, checkLabel: label, options = [], name, checkGroupConfig, ...props },
    ref,
  ) => {
    const [allCheck, setAllCheck] = useState(false);
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
    /**
     * 전체 체크/해제
     * @param checked
     */
    const handleAllCheckChange = (checked: boolean) => {
      if (checked) {
        onChange(options.map((option: any) => option.value));
      } else {
        onChange([]);
      }
    };
    useEffect(() => {
      if (value.length === options.length) {
        setAllCheck(true);
      } else {
        setAllCheck(false);
      }
    }, [value]);
    return (
      <div ref={ref} className={cn(styles.start, styles.checkbox_list)}>
        {checkGroupConfig?.allCheck && (
          <Checkbox checked={allCheck} label={'전체'} onCheckedChange={handleAllCheckChange} />
        )}
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
