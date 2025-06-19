import {
  CheckboxGroupFormField,
  Input,
  InputModalSelectorFormField,
  RadioGroupFormField,
  Textarea,
  TextareaFormField,
} from '@learnway/ui';
import { FormTranslationBox } from '../../../features/platform/ui/platform/system/translation/form-translation-box';
import { SwitchFormField } from './switch-form-field';
import { FormFieldConfig } from '@learnway/hooks';
import { ChipListFormField } from './chip-list-form-field';
import { PhoneNumberFormField } from './phone-number-form-filed';
import { DropdownFormField } from '../../../features/form/ui';
import { CheckBoxFormField } from './checkbox-form-field';
import { ThumbnailListFormField } from './thumbnail-list-form-field';
import { ThumbnailListFormFieldV2 } from './thumbnail-list-form-field-v2';

export const formFieldConfig: FormFieldConfig = {
  alphanumeric: Input,
  password: Input,
  text: Input,
  number: Input,
  'radio-group': RadioGroupFormField,
  checkbox: CheckBoxFormField,
  'checkbox-group': CheckboxGroupFormField,
  dropdown: DropdownFormField,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': TextareaFormField,
  translationBox: FormTranslationBox,
  'phone-number': PhoneNumberFormField,
  'chip-list': ChipListFormField,
  'thumbnail-list': ThumbnailListFormField,
  'thumbnail-list-v2': ThumbnailListFormFieldV2,
};
