import { FocusEventHandler } from 'react';
import { CheckFieldProps } from './checkbox/type';
import { DateRangeFieldProps } from './date-picker/date-range-picker';
import { NumberFieldProps } from './input/type';
import { RadioFieldProps } from './radio/type';
import { MultiSelectFieldProps, SelectFieldProps } from './select/type';
import { SwitchFieldProps } from './switch/type';

export enum FieldType {
  TEXT = 'text',
  PASSWORD = 'password',
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
  [FieldType.PASSWORD]: string;
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

export interface BaseFieldProps<T = any> {
  type?: FieldType;
  name?: string;
  label?: string;
  error?: boolean;
  mode?: FormMode;
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: FocusEventHandler<T> | undefined;
  isRequired?: boolean;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  extra?: any;
}

export type DynamicFieldProps =
  // | TextFieldProps
  | NumberFieldProps
  | SelectFieldProps
  | MultiSelectFieldProps
  | CheckFieldProps
  | SwitchFieldProps
  | RadioFieldProps
  // | DateFieldProps
  | DateRangeFieldProps;

///////

export interface BaseField<T = any> {
  name: string;
  label: string;
  type: FieldType;
  error?: boolean;
}

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};
