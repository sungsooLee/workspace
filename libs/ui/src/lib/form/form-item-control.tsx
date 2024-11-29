import { ControllerRenderProps } from 'react-hook-form';
import { FieldType } from '../type';
import FormInput from '../input/input';
import FormSelect from '../select/select';
import FormNumberInput from '../input/number-input';
import FormMultiSelect from '../select/multi-select';
import FormCheckBox from '../checkbox/checkbox';
// import FormCheckBox from '@learnway/ui';
import FormSwitch from '../switch/switch';
import FormRadioGroup from '../radio/radio';
import FormDatePicker from '../date-picker/date-picker';
import FormDateRangePicker from '../date-picker/date-range-picker';

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
    error: !!fieldState.error,
    mode: props.mode,
    ...field,
  };
  const type: FieldType = props.type;
  switch (type) {
    case FieldType.TEXT:
    case FieldType.PASSWORD:
      return <FormInput {...commonProps} placeholder={props.placeholder} />;
    case FieldType.SELECT:
      return <FormSelect {...commonProps} options={props.options} />;

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
        <FormNumberInput
          {...commonProps}
          prefix={props.prefix}
          suffix={props.suffix}
          currency={props.currency}
          decimalScale={props.decimalScale}
          thousandSeparator={props.thousandSeparator}
          allowNegative={props.allowNegative}
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
          formLabel={props?.formLabel}
        />
      );
    case FieldType.RADIO:
      return (
        <FormRadioGroup
          {...commonProps}
          error={!!fieldState.error}
          options={props.options}
          onValueChange={field.onChange}
          orientation={props.orientation}
        />
      );
    case FieldType.DATE:
      return <FormDatePicker {...commonProps} />;
    case FieldType.DATE_RANGE:
      return <FormDateRangePicker {...commonProps} />;
  }
};
