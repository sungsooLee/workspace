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
import { FormCategorySelector } from './dialogs/form-category-selector';
import { FormContentsThumbnail } from './dialogs/form-contents-thumbnail';
import { FormSelect } from './dialogs/form-select';
import { FormChipList } from '@/libs/ui/src/lib/chips/form-chip-list';

export const dialogConfig = {
  text: Input,
  'radio-group': FormRadioGroup,
  checkbox: FormCheckbox,
  'checkbox-group': FormCheckboxGroup,
  'category-selector': FormCategorySelector,
  'contents-thumbnail': FormContentsThumbnail,
  dropdown: FormSelect,
  'text-popup-button': InputButton,
  'text-limit': InputLimit,
  'text-area': FormTextarea,
  'chip-list': FormChipList,
  'thumbnail-image-upload': FormThumbnailImageUpload,
};
