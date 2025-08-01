import { CheckboxGroupFormField, InputModalSelectorFormField, RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';
import { PhoneNumberFormField } from '@learnway/ui/phone-number';
import { FormFieldConfig } from '@learnway/hooks';

import { SwitchFormField } from './switch-form-field';
import { CheckBoxFormField } from './checkbox-form-field';
// TODO: Fix unknown imports:  from '@learnway/ui'
import { Input } from '@learnway/ui/input';
import { Textarea } from '@learnway/ui/textarea';

export const formFieldConfig: FormFieldConfig = {
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
