import {
  FormCheckbox,
  FormRadioGroup,
  FormTextarea,
  Input,
  InputModalSelectorFormField,
  Textarea,
} from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { FormTranslationBox } from '../../../features/platform/ui/platform/system/translation/form-translation-box';
import { SelectFormField } from '../../../features/form/ui';
import { SwitchFormField } from './switch-form-field';
import { FormFieldConfig } from '@learnway/hooks';

export const formFieldConfig: FormFieldConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: FormCheckbox,
  'checkbox-group': FormCheckboxGroup,
  dropdown: SelectFormField,
  switch: SwitchFormField,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': FormTextarea,
  translationBox: FormTranslationBox,
};
