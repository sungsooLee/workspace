import { ReactNode } from 'react';
import { SelectOption } from '../select/type';

export interface RadioCardOption extends Omit<SelectOption, 'label'> {
  label: ReactNode;
  description?: string;
}
