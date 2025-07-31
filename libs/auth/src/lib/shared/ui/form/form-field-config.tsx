import { FormFieldConfig } from '@learnway/hooks';
import { Input } from '@learnway/ui/input';

import {
  CheckboxGroupFormField,
  InputModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';
import { PhoneNumberFormField } from '@learnway/ui/phone-number';
import { Textarea } from '@learnway/ui/textarea';
import { CheckBoxFormField } from './checkbox-form-field';
import { SwitchFormField } from './switch-form-field';
export const formFieldConfig: FormFieldConfig = {
  password: Input,
  number: Input,
  text: Input,
  'radio-group': RadioGroupFormField,
  checkbox: CheckBoxFormField,
  'checkbox-group': CheckboxGroupFormField,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': TextareaFormField,
  'phone-number': PhoneNumberFormField,
};
