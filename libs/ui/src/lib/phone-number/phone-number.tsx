import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { useState, useEffect } from 'react';
import { useCreation } from 'ahooks';
import { isFunction } from 'lodash';

import { getBrowserNation } from '@learnway/shared';

import NationNumbers from './nation-number.json';
import { Input, InputProps } from '../input/input';
import { Dropdown } from '../dropdown/dropdown';
import type { DropdownOption } from '../type';
import styles from './phone-number.module.css';

export interface PhoneNumberValue {
  nationCode: string;
  number: string;
}

export interface PhoneNumberComponentProps extends Omit<InputProps, 'value' | 'onChange'> {
  options?: DropdownOption[];
  value?: PhoneNumberValue;
  onChange?: (value: PhoneNumberValue) => void;
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
  const [editionValue, setEditionValue] = useState<PhoneNumberValue>(
    value ??
      ({
        nationCode: getBrowserNation(),
      } as PhoneNumberValue),
  );

  const nationOptions = useCreation(() => {
    return NationNumbers;
  }, []);

  useEffect(() => {
    if (value !== editionValue) {
      onChange?.(editionValue);
    }
  }, [editionValue]);

  const handleSelect = (option: DropdownOption) => {
    setEditionValue({ ...editionValue, nationCode: option.value });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditionValue({ ...editionValue, number: e.target.value });
  };

  return (
    <div
      className={cn(
        styles.start,
        styles.wrap,
        size && styles[size],
        readOnly && styles.readonly,
        disabled && styles.disabled,
      )}
    >
      <Dropdown
        options={options ?? nationOptions}
        onChange={(option: DropdownOption) => handleSelect(option)}
        className={styles.select_area}
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        value={editionValue?.nationCode ?? getBrowserNation()}
      />
      <Input
        value={editionValue?.number}
        onChange={(e) => handleChangeNumber(e)}
        {...props}
        className={styles.input_area}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export const PhoneNumber = PhoneNumberComponent;
