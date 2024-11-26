import { ControllerProps, useFormContext } from 'react-hook-form';
import { CommonFieldProps, FieldType, MultiSelectFieldConfig, SelectOption } from './type';
// import { useFormSchema } from "./context";
import { z } from 'zod';
import { FormInput } from './form-input';
import FormSelect from './form-select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form/form';
import FormNumberInput from './form-number-input';
import FormMultiSelect from './form-multi-select';
import FormCheckBox from './form-checkbox';
import FormSwitch from './form-switch';
import FormRadioGroup from './form-radio';
import FormDatePicker from './form-datepicker';
import FormDateRangePicker from './form-date-range-picker';

export const isRequiredField = (fieldName: string, schema?: z.ZodType): boolean => {
  if (!schema) return false;

  const getInnerSchema = (s: z.ZodType): z.ZodType => {
    if (s instanceof z.ZodEffects) {
      return getInnerSchema(s.innerType());
    }
    return s;
  };

  const innerSchema = getInnerSchema(schema);
  if (!(innerSchema instanceof z.ZodObject)) return false;

  const field = innerSchema.shape[fieldName];
  if (!field) return false;

  return !field.isOptional();
};

const renderControl = (field: any, fieldState: any, props: any) => {
  const commonProps = {
    ...field,
    error: !!fieldState.error,
    mode: props.mode,
  };
  // 읽기 모드 컴포넌트 모음..
  //TODO: 타입별로 추가 필요
  if (commonProps.mode == 'read') return;

  // 수정 모드 컴포넌트 모음..
  switch (props.type) {
    case FieldType.TEXT:
      return <FormInput {...commonProps} placeholder={props.placeholder} />;
    case FieldType.SELECT:
      return <FormSelect {...commonProps} options={props.options} />;

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

    case FieldType.MULTI_SELECT:
      return (
        <FormMultiSelect
          {...commonProps}
          value={field.value || []}
          options={props.options}
          maxCount={props.maxCount}
          animation={props.animation}
          placeholder={props.placeholder}
          variant={props.variant}
        />
      );

    case FieldType.CHECKBOX:
      return (
        <FormCheckBox
          {...commonProps}
          checked={props.checked}
          onCheckedChange={field.onChange}
          checkboxLabel={props?.checkboxLabel}
        />
      );

    case FieldType.SWITCH:
      return (
        <FormSwitch
          {...commonProps}
          checked={props.checked}
          onCheckedChange={field.onChange}
          formLabel={props?.formLabel}
        />
      );

    case FieldType.RADIO:
      return (
        <FormRadioGroup
          {...field}
          error={!!fieldState.error}
          options={props.options}
          orientation={props.orientation}
        />
      );

    case FieldType.DATE:
      return <FormDatePicker {...commonProps} />;

    case FieldType.DATE_RANGE:
      return <FormDateRangePicker {...commonProps} />;
  }
  return <></>;
};

const CommonFormItem = ({ name, label, type, ...props }: CommonFieldProps) => {
  //     useFormContext() 를 통해 종속된 form인스턴스를 참조한다.
  const form = useFormContext();

  // const allProps: CommonFieldProps = {
  //   name,
  //   label,
  //   type,
  //   ...props,
  // };

  // const { schema } = useFormSchema();

  // const fieldSchema = schema?.shape?.[props.name];
  // const isRequired = fieldSchema && !fieldSchema.isOptional();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {label}
            {/* {isRequired && <span className="text-red-500 ml-1">*</span>} */}
          </FormLabel>
          <FormControl>{renderControl(field, fieldState, { type, ...props })}</FormControl>
          <FormMessage />
        </FormItem>
      )}></FormField>
  );
};

export default CommonFormItem;
