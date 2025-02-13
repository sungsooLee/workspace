import { DialogConfig } from './type';
import UserSearchPop from '../form-dialog/user-search-pop';
import { FormCheckbox, FormDateRangePicker } from '@learnway/ui';

export const searchDialogConfig: DialogConfig = {
  /*text: Input,
  password: Input,*/
  checkbox: FormCheckbox,
  //'radio-group': FormRadioGroup,
  'date-range': FormDateRangePicker,
  /*'date-range': DateRange,
  dropdown: DropDown,
  'multi-dropdown': MultiDropdown,

  checkbox: InputCheck,
  'check-group': InputCheckGroup,
  'radio-group': InputRadioGroup,*/
};
export const boConfig = {
  ...searchDialogConfig,
  'user-search-pop': UserSearchPop,
};
