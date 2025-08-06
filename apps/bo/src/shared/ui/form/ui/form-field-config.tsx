import { FormFieldConfig } from '@learnway/hooks';
import {
  CheckboxGroupFormField,
  InputModalSelectorFormField,
  RadioGroupFormField,
  TextareaFormField,
} from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { Textarea } from '@learnway/ui/textarea';
import { AttachmentFormField } from './attachment-form-field';
import { CheckBoxFormField } from './checkbox-form-field';
import { ChipListFormField } from './chip-list-form-field';
import { DropdownFormField } from './dropdown-form-field';
import { FormTranslationBox } from './form-translation-box';
import { PhoneNumberFormField } from './phone-number-form-filed';
import { SingleAttachmentFormField } from './single-attachment-form-field';
import { SwitchFormField } from './switch-form-field';
import { ThumbnailListFormField } from './thumbnail-list-form-field';
import { ThumbnailPublicFormField } from './thumbnail-public-form-field';

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
  'thumbnail-public': ThumbnailPublicFormField,
  attachment: AttachmentFormField,
  'single-attachment': SingleAttachmentFormField,
};
