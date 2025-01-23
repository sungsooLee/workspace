import { FC } from 'react';
import { Control } from 'react-hook-form';

export interface DialogItem {
  value: string;
  label: string;
  [key: string]: any;
}

export interface DialogProps {
  control: Control<any>;
  name: string;
  label?: string;
  items?: DialogItem[];
  [key: string]: any;
}

export interface DialogConfig {
  [key: string]: FC<DialogProps>;
}
