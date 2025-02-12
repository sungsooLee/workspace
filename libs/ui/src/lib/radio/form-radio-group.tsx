import { FC } from 'react';
import { Radio } from './radio';

const FormRadioGroupComponent: FC<any> = ({
  value,
  name,
  onChange,
  options,
  fieldRefs,
  ...props
}) => {
  return (
    <div ref={(ref) => (fieldRefs.current[name] = ref)}>
      <Radio
        value={value}
        defaultValue={value}
        onValueChange={onChange}
        options={options.map((item: any) => ({ value: item.value, label: item.label }))}
        {...props}
      />
    </div>
  );
};
export const FormRadioGroup = FormRadioGroupComponent;
