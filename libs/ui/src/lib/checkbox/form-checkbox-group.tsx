import { FC, Fragment } from 'react';
import { Checkbox } from './checkbox';

const FormCheckBoxGroupComponent: FC<any> = ({
  value = [],
  onChange,
  checkLabel: label,
  options = [],
  fieldRefs,
  name,
  ...props
}) => {
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
    <div ref={(ref) => (fieldRefs.current[name] = ref)}>
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
};
export const FormCheckboxGroup = FormCheckBoxGroupComponent;
