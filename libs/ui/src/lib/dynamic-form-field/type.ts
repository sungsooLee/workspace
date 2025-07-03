import { UseFormReturn } from 'react-hook-form';
import { ComponentType, ReactElement, ReactNode } from 'react';
export interface DynamicFormFieldProps {
  control?: UseFormReturn['control'];
  name?: string;
  component: ComponentType<any> | ReactElement;
  children?: ReactNode;
  [key: string]: any;
}
