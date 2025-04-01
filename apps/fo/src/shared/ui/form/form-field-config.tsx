import {
  CheckboxGroupFormField,
  FormTextarea,
  Input,
  InputModalSelectorFormField,
  PhoneNumberFormField,
  RadioGroupFormField,
  Textarea,
} from '@learnway/ui';
import { FormFieldConfig } from '@learnway/hooks';

import { SwitchFormField } from './switch-form-field';
import { CheckBoxFormField } from './checkbox-form-field';

export const formFieldConfig: FormFieldConfig = {
  text: Input,
  'radio-group': RadioGroupFormField,
  checkbox: CheckBoxFormField,
  'checkbox-group': CheckboxGroupFormField,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': FormTextarea,
  'phone-number': PhoneNumberFormField,
};
