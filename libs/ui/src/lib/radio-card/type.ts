import { ReactNode } from 'react';
import { SelectOption } from '../type';

export interface RadioCardOption extends Omit<SelectOption, 'label'> {
  label: ReactNode;
  description?: string;
}
