import { useTranslation } from 'react-i18next';
import { cn, toArray } from '@learnway/shared';
import React, { ReactNode, useEffect, useState } from 'react';
import { useCreation } from 'ahooks';

import NationNumbers from './nation-number.json';
import { Input } from '../input/input';
import { Select } from '../select/select';
import type { SelectOption } from '../select/type';
import styles from './option-card.module.css';

export interface PhoneNumberItem {
  label: string;
  value: any;
  icon?: ReactNode;
  description?: string;
}

export interface PhoneNumberComponentProps {
  options: PhoneNumberItem[];
  value?: any;
  className?: string;
  labelField?: string;
  valueField?: string;
  multiple?: boolean;
  cols?: number; // row length
  size?: 'md' | 'lg';
  onOptionSelect?: (option: any) => void;
  onOptionsSelect?: (options: any[]) => void;
}

const PhoneNumberComponent = function ({
  className,
  options,
  value,
  cols,
  size,
  multiple,
  onOptionSelect,
  onOptionsSelect,
}: PhoneNumberComponentProps) {
  const { t } = useTranslation();

  // changed value from parent component
  const nationOptions = useCreation(() => {
    return NationNumbers;
  }, []);

  // callback function
  useEffect(() => {
    /*
    if (selectedOptions?.length) {
      onOptionSelect?.(selectedOptions?.[0]);
      onOptionsSelect?.(selectedOptions);
    }
      */
  }, []);

  const handleSelect = (option: SelectOption) => {
    //setSelectedOptions([option]);
  };

  return (
    <div className={cn(styles.start)}>
      <Select options={nationOptions} onChange={(option: SelectOption) => handleSelect(option)} />
      <Input />
    </div>
  );
};

export const PhoneNumber = PhoneNumberComponent;
