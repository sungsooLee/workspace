import { DateRangeSearchField } from './date-range-search-field';
import { DateSearchField } from './date-search-field';

import { AutoCompleteDropdownFormField } from '../form/ui/autocomplete-dropdown-form-field';
import { DropdownFormField } from '../form/ui/dropdown-form-field';
import { InputFormField } from '../form/ui/input-form-field';

export const searchFieldConfig = {
  text: InputFormField,
  dropdown: DropdownFormField,
  'auto-dropdown': AutoCompleteDropdownFormField,
  date: DateSearchField,
  'date-range': DateRangeSearchField,
};
