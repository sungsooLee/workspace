import { Input } from '@learnway/ui';
import { DropdownFormField } from '../../../features/form/ui/dropdown-form-field';
import { DateRangeSearchField } from './date-rage-search-field';

export const searchFieldConfig = {
  text: Input,
  dropdown: DropdownFormField,
  'date-range': DateRangeSearchField,
};
