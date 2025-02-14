import { FormCheckbox, FormRadioGroup, Input, InputButton, InputLimit } from '@learnway/ui';
import { FormCheckboxGroup } from '@/libs/ui/src/lib/checkbox/form-checkbox-group';
import { FormCategorySelector } from './dialogs/form-category-selector';
import { FormContentsThumbnail } from './dialogs/form-contents-thumbnail';
import { FormSelect } from './dialogs/form-select';

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
};
