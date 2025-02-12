import { DialogConfig } from './type';
import DateRange from '../form-dialog/date-range';
import DropDown from '../form-dialog/drop-down';
import MultiDropdown from '../form-dialog/multi-drop-down';
import UserSearchPop from '../form-dialog/user-search-pop';
import InputCheck from '../form-dialog/input-check';
import InputCheckGroup from '../form-dialog/input-check-group';
import InputRadioGroup from '../form-dialog/input-radio-group';
import { FormCheckbox, FormDateRangePicker, FormInput, FormRadioGroup } from '@learnway/ui';

export const searchDialogConfig: DialogConfig = {
  text: FormInput,
  password: FormInput,
  checkbox: FormCheckbox,
  'radio-group': FormRadioGroup,
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
