import { UseFormReturn } from 'react-hook-form';
import { ComponentType, ReactNode } from 'react';
export interface DynamicFormFieldProps {
  control?: UseFormReturn['control'];
  name?: string;
  component?: ComponentType<any>;
  children?: ReactNode;
  [key: string]: any;
}
