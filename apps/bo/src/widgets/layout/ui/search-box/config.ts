import { DialogConfig } from './type';
import InputText from '../../../../shared/ui/form-dialog/input-text';
import DateRange from '../../../../shared/ui/form-dialog/date-range';
import DropDown from '../../../../shared/ui/form-dialog/drop-down';
import MultiDropdown from '../../../../shared/ui/form-dialog/multi-drop-down';
import UserSearchPop from '../../../../shared/ui/form-dialog/user-search-pop';
import InputCheck from '../../../../shared/ui/form-dialog/input-check';
import InputCheckGroup from '../../../../shared/ui/form-dialog/input-check-group';
import InputRadioGroup from '../../../../shared/ui/form-dialog/input-radio-group';

export const searchDialogConfig: DialogConfig = {
  text: InputText,
  'date-range': DateRange,
  dropdown: DropDown,
  'multi-dropdown': MultiDropdown,
  'user-search-pop': UserSearchPop,
  checkbox: InputCheck,
  'check-group': InputCheckGroup,
  'radio-group': InputRadioGroup,
};
