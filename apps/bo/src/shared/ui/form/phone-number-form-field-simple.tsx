import { forwardRef, useState, useEffect } from 'react';
import { PhoneNumber, PhoneNumberValue } from '@learnway/ui';
import { useCodeStore, CODE_GROUP } from '@learnway/hooks';
import { getNationCodeFromBrowser } from '@learnway/shared';

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
const PhoneNumberFormFieldSimpleComponent = forwardRef<HTMLDivElement, PhoneNumberFormFieldSimpleProps>(
  ({ value, onChange, disabled, readOnly, placeholder, className, size, ...props }, ref) => {
    
    const { getCode } = useCodeStore();
    const [nationOptions, setNationOptions] = useState<any[]>([]);
    const [telephoneCountryCodes, setTelephoneCountryCodes] = useState<any[]>([]);

    // 국가코드 로드
    useEffect(() => {
      const init = async () => {
        try {
          const nationCodes: any = await getCode(CODE_GROUP['cmmon.TelCountryCode']);
          const options = nationCodes.map((code: any) => ({
            value: code.value,
            label: code.cdContent,
          }));
          setNationOptions(options);
          setTelephoneCountryCodes(nationCodes);
        } catch (error) {
          console.warn('Failed to load nation codes:', error);
        }
      };
      init();
    }, [getCode]);

    // PhoneNumber 컴포넌트의 onChange 핸들러
    const handlePhoneNumberChange = (newValue: PhoneNumberValue) => {
      onChange?.(newValue);
    };

    // 기본값 설정 (nationCode가 없으면 브라우저에서 추측)
    const phoneValue: PhoneNumberValue = {
      nationCode: value?.nationCode || getNationCodeFromBrowser(telephoneCountryCodes),
      number: value?.number || '',
    };

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
  }
);

export const PhoneNumberFormFieldSimple = PhoneNumberFormFieldSimpleComponent;