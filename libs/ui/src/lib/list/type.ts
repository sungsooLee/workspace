import { ReactElement } from 'react';

export interface ListOption {
  label: string;
  value: string;
  disabled?: boolean;
  subLabel?: string;
  extra?: any;
  child?: (props: ListOption) => ReactElement;
}
