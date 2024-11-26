import { z } from 'zod';
import { DefaultValues, UseFormReturn } from 'react-hook-form';
import { NumericFormatProps } from 'react-number-format';
import { DateRange } from 'react-day-picker';

//     Type에 따라 여러 종류의 입력 요건을 처리할 수 있다.
//         input
//         input number
//         select
//         multi select
//         switch
//         radio
//         checkbox
//         date
//         date time
//         date range
export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  MULTI_SELECT = 'multi-select',
  SWITCH = 'switch',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  // DATE_TIME = 'date-time',
  DATE_RANGE = 'date-range',
}

export type FieldTpeValue = {
  [FieldType.TEXT]: string;
  [FieldType.NUMBER]: number;
  [FieldType.SELECT]: string | number;
  [FieldType.MULTI_SELECT]: string | number;
  [FieldType.SWITCH]: boolean;
  [FieldType.RADIO]: boolean;
  [FieldType.CHECKBOX]: boolean;
  [FieldType.DATE]: Date;
  // [FieldType.DATE_TIME]: Date;
  [FieldType.DATE_RANGE]: Date[];
};

//     수정 모드와 view모드 전환이 가능하다.
export type FormMode = 'read' | 'edit';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface RadioOption extends SelectOption {
  description?: string;
}

//     form data의 physical name을 입력 받을 수 있다.
//     표시 이름을 입력 받을 수 있다(label, 다국어처리)
//     입력 rule을 규격에 맞게 입력 받을 수 있다.
//         rule별 에러 메세지 처리가 가능하다. (다국어 처리)
//         form 내 다른 field와의 dependency 규칙을 적용할 수 있다.
//         required의 경우 label에 '*' 가 표시된다.

export interface FormSchemaContextValue {
  schema: z.ZodObject<any>;
}

export interface BaseFieldConfig {
  type: FieldType;
  name: string;
  label: string;
  error?: boolean;
  mode?: FormMode;
  value?: any;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: FieldType.TEXT;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: FieldType.SELECT;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: FieldType.NUMBER;
  prefix?: string;
  suffix?: string;
  currency?: string;
  locale?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean | string;
  min?: number;
  max?: number;
}

export interface MultiSelectFieldConfig extends BaseFieldConfig {
  type: FieldType.MULTI_SELECT;
  onChange?: (value: string[] | string) => void;
  options: SelectOption[];
  maxCount?: number;
  animation?: number;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
}

export interface CheckFieldConfig extends BaseFieldConfig {
  type: FieldType.CHECKBOX;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxLabel?: string;
}

export interface SwitchFieldConfig extends BaseFieldConfig {
  type: FieldType.SWITCH;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  formLabel?: string;
  // label Position에 대한 정의도 해야하는지 (e.g. Left, Right..)
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: FieldType.RADIO;
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface DateBaseConfig extends BaseFieldConfig {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showTimePicker?: boolean;
  timeFormat?: '12' | '24';
  numberOfMonths?: number;
  minuteStep?: number;
}

export interface DateFieldConfig extends DateBaseConfig {
  type: FieldType.DATE;
  onChange?: (date: Date | undefined) => void;
}

// export interface DateTimeFieldConfig extends DateBaseConfig {
//   type: FieldType.DATE_TIME;
//   minuteStep?: number;
// }

export interface DateRangeFieldConfig extends DateBaseConfig {
  type: FieldType.DATE_RANGE;
  onChange?: (range: DateRange | undefined) => void;
  fromLabel?: string;
  toLabel?: string;
}

export type CommonFieldProps =
  | TextFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | MultiSelectFieldConfig
  | CheckFieldConfig
  | SwitchFieldConfig
  | RadioFieldConfig
  | DateFieldConfig
  // | DateTimeFieldConfig
  | DateRangeFieldConfig;
export interface CustomNumberInputProps extends Omit<NumericFormatProps, 'onChange'> {
  error?: boolean;
  mode?: FormMode;
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}

export type AnyZodSchema = z.ZodType<any, any, any>;

export type ExtendedFormProps<T extends z.ZodType> = {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: DefaultValues<z.infer<T>>;
  children: React.ReactNode;
  className?: string;
};
