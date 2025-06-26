// import { DateRangePickerFormField } from '@features/learning/ui/resource/date-range-picker-form-field';
import { DateRangeFormField } from './date-range-form-field';
import { AutoCompleteDropdownFormField, DropdownFormField, InputFormField } from '@features/form';

export const searchFieldConfig = {
  text: InputFormField,
  dropdown: DropdownFormField,
  'auto-dropdown': AutoCompleteDropdownFormField,
  'date-range': DateRangeFormField,
};
