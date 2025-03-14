import {
  FormCheckbox,
  FormRadioGroup,
  FormTextarea,
  FormThumbnailImageUpload,
  Input,
  InputModalSelectorFormField,
  Textarea,
} from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { FormChipList } from '@/libs/ui/src/lib/chips/form-chip-list';
import { FormSelect } from './dialogs/form-select';
import { FormSwitch } from './dialogs/form-switch';
import { FormTranslationBox } from '../../../features/platform/ui/platform/system/translation/form-translation-box';

export const dialogConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: FormCheckbox,
  'checkbox-group': FormCheckboxGroup,
  dropdown: FormSelect,
  switch: FormSwitch,
  textarea: Textarea,
  'text-popup-button': InputModalSelectorFormField,
  'text-area': FormTextarea,
  'chip-list': FormChipList,
  'thumbnail-image-upload': FormThumbnailImageUpload,
  translationBox: FormTranslationBox,
};
