import { useTranslation } from 'react-i18next';
import { cn } from '@learnway/shared';
import { useState, useEffect } from 'react';
import { useCreation } from 'ahooks';
import { isEqual } from 'lodash';

import { getNationCodeFromBrowser } from '@learnway/shared';

import { useCodeStore, CODE_GROUP } from '@learnway/hooks';
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
  const [editionValue, setEditionValue] = useState<PhoneNumberValue>({
    number: value?.number,
    nationCode: value?.nationCode,
  } as PhoneNumberValue);

  const { getCode } = useCodeStore();

  const [nationOptions, setNationOptions] = useState<any[]>([]);
  const [telephoneCountryCodes, setTelephoneCountryCodes] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const nationCodes: any = await getCode(CODE_GROUP['cmmon.TelCountryCode']);
      const options = nationCodes.map((code: any) => ({
        value: code.value,
        label: code.cdContent,
      }));
      setNationOptions(options);
      setTelephoneCountryCodes(nationCodes);
    };
    init();
  }, [getCode]);

  useEffect(() => {
    if (isEqual(value, editionValue)) {
      return;
    }
    onChange?.(editionValue);
  }, [editionValue]);

  useEffect(() => {
    if (!value || isEqual(value, editionValue)) {
      return;
    }
    setEditionValue(
      !value?.nationCode
        ? { ...value, nationCode: getNationCodeFromBrowser(telephoneCountryCodes) }
        : value,
    );
  }, [value]);

  const handleSelect = (option: any) => {
    setEditionValue({ ...editionValue, nationCode: option });
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
        value={editionValue?.nationCode ?? getNationCodeFromBrowser(telephoneCountryCodes)}
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
