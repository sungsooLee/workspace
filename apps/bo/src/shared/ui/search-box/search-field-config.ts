import { DateRangeSearchField } from './date-range-search-field';
import { DateSearchField } from './date-search-field';

import { AutoCompleteDropdownFormField, DropdownFormField, InputFormField } from '@shared/ui/form';

export const searchFieldConfig = {
  text: InputFormField,
  dropdown: DropdownFormField,
  'auto-dropdown': AutoCompleteDropdownFormField,
  date: DateSearchField,
  'date-range': DateRangeSearchField,
};
