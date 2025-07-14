import React, { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { AutoFormContext, AutoFormContextValue } from '@learnway/hooks';

interface AutoFormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  value: AutoFormContextValue<T>;
}
export const AutoFormProvider = <T extends FieldValues = FieldValues>({
  children,
  value,
}: AutoFormProviderProps<T>) => {
  return <AutoFormContext.Provider value={value}>{children}</AutoFormContext.Provider>;
};
