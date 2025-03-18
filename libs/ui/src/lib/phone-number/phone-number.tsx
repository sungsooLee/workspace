import { useTranslation } from 'react-i18next';
import { cn, toArray } from '@learnway/shared';
import React, { ReactNode, useEffect, useState } from 'react';
import { useCreation } from 'ahooks';
import { isFunction } from 'lodash';

import NationNumbers from './nation-number.json';
import { Input, InputProps } from '../input/input';
import { Select } from '../select/select';
import type { SelectOption } from '../select/type';
import styles from './phone-number.module.css';

export interface PhoneNumberComponentProps extends InputProps {
  options?: SelectOption[];
  value?: any;
  className?: string;
  size?: any;
}

const PhoneNumberComponent = function ({
  className,
  options,
  value,
  size,
  readOnly,
  disabled,
  onChange,
  ...props
}: PhoneNumberComponentProps) {
  const { t } = useTranslation();
  const [editionValue, setEditionValue] = useState();

  const nationOptions = useCreation(() => {
    return NationNumbers;
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (isFunction(onChange)) {
      onChange(value);
    }
  };

  return (
    <div
      className={cn(
        styles.start,
        styles.wrap,
        size && styles[size],
        readOnly && styles.readonly,
        disabled && styles.disabled,
      )}>
      <Select
        options={options ?? nationOptions}
        onChange={(option: SelectOption) => handleSelect(option)}
        className={styles.select_area}
        size={size}
        readOnly={readOnly}
        disabled={disabled}
      />
      <Input
        value={value}
        onChange={onChange}
        {...props}
        className={styles.input_area}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const PhoneNumber = PhoneNumberComponent;
