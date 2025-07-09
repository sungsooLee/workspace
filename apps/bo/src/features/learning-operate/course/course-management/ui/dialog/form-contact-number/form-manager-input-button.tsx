import { forwardRef, useEffect, useState } from 'react';

import { Input } from '@learnway/ui';

export interface IPhoneNumber {
  countryCode: string; // 국가 코드
  areaCode: string; // 국번
  number: string; // 번호
}

export interface FormContactNumberProps {
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * 공통 form contact number component
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormContactNumberComponent = forwardRef<HTMLDivElement, FormContactNumberProps>(
  ({ value, onChange: ownerOnChange, ...props }, ref) => {
    const [phone, setPhone] = useState<IPhoneNumber>(parsePhoneNumber(value));

    useEffect(() => {
      const newValue = [phone.countryCode, phone.areaCode, phone.number].join('');
      if (value !== newValue) {
        ownerOnChange?.(newValue);
      }
    }, [phone]);

    return (
      <div ref={ref} className={'flex flex-row items-center gap-3'}>
        <Input
          value={phone?.countryCode}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            setPhone({ ...phone, countryCode: event.target.value })
          }
        />
        <Input
          value={phone?.areaCode}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            setPhone({ ...phone, areaCode: event.target.value })
          }
        />
        <span>-</span>
        <Input
          value={phone?.number}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            setPhone({ ...phone, number: event.target.value })
          }
        />
      </div>
    );
  },
);
export const FormContactNumber = FormContactNumberComponent;

// TODO: libphonenumber-js 사용 예정
const parsePhoneNumber = (value?: string): IPhoneNumber => {
  const phoneRegex = /^\+(\d+)-(\d+)-([\d-]+)$/;
  const match = value?.match(phoneRegex) || [];
  const [, countryCode = '', areaCode = '', number = ''] = match;
  return { countryCode: `+${countryCode}`, areaCode, number };
};
