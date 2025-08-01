import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { PhoneNumber, PhoneNumberValue } from '@learnway/ui/phone-number';
import { isEqual } from 'lodash-es';
import React, { forwardRef, useEffect, useState } from 'react';

export interface PhoneNumberFormFieldSimpleProps {
  value?: PhoneNumberValue;
  onChange?: (value: PhoneNumberValue) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  size?: any;
}

/**
 * FormRow3와 함께 사용하기 위한 간단한 PhoneNumber Form Field
 * 기존 PhoneNumberFormField와 동일한 PhoneNumberValue 객체 형태로 동작
 */
const PhoneNumberFormFieldSimpleComponent = forwardRef<
  HTMLDivElement,
  PhoneNumberFormFieldSimpleProps
>(({ value, onChange, disabled, readOnly, placeholder, className, size, ...props }, ref) => {
  const { getCode } = useCodeStore();
  const [nationOptions, setNationOptions] = useState<any[]>([]);
  const [telephoneCountryCodes, setTelephoneCountryCodes] = useState<any[]>([]);

  // 국가코드 로드
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

  const handlePhoneNumberChange = React.useCallback(
    (newValue: PhoneNumberValue) => {
      if (!isEqual(newValue, value)) {
        onChange?.(newValue);
      }
    },
    [onChange, value],
  );

  const phoneValue: PhoneNumberValue | undefined = React.useMemo(() => {
    if (!value || (!value.nationCode && !value.number)) {
      return undefined;
    }

    return {
      nationCode: value.nationCode || '',
      number: value.number || '',
    };
  }, [value]);

  return (
    <div ref={ref} className={className}>
      <PhoneNumber
        options={nationOptions}
        value={phoneValue}
        onChange={handlePhoneNumberChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        size={size}
        {...props}
      />
    </div>
  );
});

export const PhoneNumberFormFieldSimple = PhoneNumberFormFieldSimpleComponent;
