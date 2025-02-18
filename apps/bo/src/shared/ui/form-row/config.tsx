import {
  FormCheckbox,
  FormRadioGroup,
  FormTextarea,
  FormThumbnailImageUpload,
  Input,
  InputButton,
  InputLimit,
} from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { FormChipList } from '@/libs/ui/src/lib/chips/form-chip-list';
import { FormSelect } from './dialogs/form-select';

export const dialogConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: FormCheckbox,
  'checkbox-group': FormCheckboxGroup,
  dropdown: FormSelect,
  'text-popup-button': InputButton,
  'text-limit': InputLimit,
  'text-area': FormTextarea,
  'chip-list': FormChipList,
  'thumbnail-image-upload': FormThumbnailImageUpload,
};
