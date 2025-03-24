import {
  FormCheckbox,
  FormRadioGroup,
  FormTextarea,
  Input,
  InputModalSelectorFormField,
  Textarea,
  PhoneNumberFormField,
} from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { SwitchFormField } from './switch-form-field';
import { FormFieldConfig } from '@learnway/hooks';

export const formFieldConfig: FormFieldConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: FormCheckbox,
  'checkbox-group': FormCheckboxGroup,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': FormTextarea,
  'phone-number': PhoneNumberFormField,
};
