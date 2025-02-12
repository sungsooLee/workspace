import { ControllerRenderProps } from 'react-hook-form';
import { FieldType } from '../type';
import { Input as FormInput } from '../input/input';
import { MultiSelect as FormMultiSelect } from '../select/multi-select';
import { Checkbox as FormCheckBox } from '../checkbox/checkbox';
import { DatePicker as FormDatePicker } from '../date-picker/date-picker';
import { DateRangePicker as FormDateRangePicker } from '../date-picker/date-range-picker';
import { Radio as FormRadioGroup } from '../radio/radio';
import { Select } from '../select/select';
import { Switch as FormSwitch } from '../switch/switch';

interface FormControlProps {
  field: ControllerRenderProps;
  fieldState: {
    error?: any;
    isDirty: boolean;
    isTouched: boolean;
  };
  props: any;
}

export const FormItemControl = ({ field, fieldState, props }: FormControlProps) => {
  const commonProps = {
    ...props,
    mode: props.mode,
    ...field,
  };
  const type: FieldType = props.type;
  switch (type) {
    case FieldType.TEXT:
    case FieldType.PASSWORD:
      return <FormInput {...commonProps} />;
    case FieldType.SELECT:
      return <Select {...commonProps} options={props.options} />;

    case FieldType.MULTI_SELECT:
      return (
        <FormMultiSelect
          {...commonProps}
          value={field.value}
          onChange={(values) => {
            field.onChange(values);
          }}
          options={props.options}
          maxCount={props.maxCount}
          animation={props.animation}
          placeholder={props.placeholder}
          variant={props.variant}
        />
      );
    case FieldType.NUMBER:
      return (
        <FormInput
          {...commonProps}
          prefix={props.prefix}
          suffix={props.suffix}
          currency={props.currency}
          decimalScale={props.decimalScale}
          thousandSeparator={props.thousandSeparator}
          allowNegative={props.allowNegative}
          onChange={(value) => {
            field.onChange(value === '' ? undefined : Number(value));
          }}
        />
      );
    case FieldType.CHECKBOX:
      return (
        <FormCheckBox
          {...commonProps}
          checked={field.value}
          onCheckedChange={field.onChange}
          checkboxLabel={props?.checkboxLabel}
        />
      );
    case FieldType.SWITCH:
      return (
        <FormSwitch
          {...commonProps}
          checked={field.value}
          onChange={field.onChange}
          formLabel={props?.label}
        />
      );
    case FieldType.RADIO:
      return (
        <FormRadioGroup
          {...commonProps}
          options={props.options}
          onValueChange={field.onChange}
          orientation={props.orientation}
        />
      );
    case FieldType.DATE:
      return <FormDatePicker {...commonProps} onChange={field.onChange} />;
    case FieldType.DATE_RANGE:
      return <FormDateRangePicker {...commonProps} />;
  }
};
