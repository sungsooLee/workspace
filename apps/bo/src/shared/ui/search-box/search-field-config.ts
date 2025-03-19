import { Input } from '@learnway/ui';
import { DateRangeFormField } from './date-range-form-field';
import { DropdownFormField } from '../../../features/form/ui';

export const searchFieldConfig = {
  text: Input,
  dropdown: DropdownFormField,
  'date-range': DateRangeFormField,
};
