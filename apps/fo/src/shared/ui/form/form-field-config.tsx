import {
  FormCheckbox,
  FormRadioGroup,
  FormTextarea,
  Input,
  InputModalSelectorFormField,
  Textarea,
  PhoneNumberFormField,
  FormCheckboxGroup,
} from '@learnway/ui';
import { FormFieldConfig } from '@learnway/hooks';

import { SwitchFormField } from './switch-form-field';
import { CheckBoxFormField } from './checkbox-form-field';

export const formFieldConfig: FormFieldConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: CheckBoxFormField,
  'checkbox-group': FormCheckboxGroup,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': FormTextarea,
  'phone-number': PhoneNumberFormField,
};
