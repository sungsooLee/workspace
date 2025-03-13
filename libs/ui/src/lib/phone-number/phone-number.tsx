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
  options: SelectOption[];
  value?: any;
  className?: string;
}

const PhoneNumberComponent = function ({
  className,
  options,
  value,
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
    <div className={cn(styles.start)}>
      <Select
        options={options ?? nationOptions}
        onChange={(option: SelectOption) => handleSelect(option)}
      />
      <Input value={value} onChange={onChange} {...props} />
    </div>
  );
};

export const PhoneNumber = PhoneNumberComponent;
