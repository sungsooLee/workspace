import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useWatch } from 'react-hook-form';

import { PhoneNumber, PhoneNumberComponentProps, PhoneNumberValue } from './phone-number';

interface PhoneNumberFormFieldProps extends BaseFormFieldProps<string> {
  phoneNumberConfig?: PhoneNumberComponentProps;
  fields?: {
    nationCode: string;
    number: string;
  };
}
/**
 * 전화 번호 form-field
 * @constructor
 */
const PhoneNumberFormFieldComponent = forwardRef<HTMLDivElement, PhoneNumberFormFieldProps>(
  (
    {
      value,
      control,
      onFormChange,
      fields = { nationCode: 'nationCode', number: 'number' },
      disabled,
      phoneNumberConfig,
    },
    _,
  ) => {
    const nationCode = useWatch({ control, name: fields.nationCode });
    /**
     * phone number 변경 이벤트
     * @param changeValue
     */
    const handleOnChange = (changeValue: PhoneNumberValue) => {
      onFormChange({
        [fields.nationCode]: changeValue.nationCode,
        [fields.number]: changeValue.number,
      });
    };

    return (
      <PhoneNumber
        {...phoneNumberConfig}
        value={{
          nationCode,
          number: value,
        }}
        onChange={handleOnChange}
        disabled={disabled}
      />
    );
  },
);

export const PhoneNumberFormField = PhoneNumberFormFieldComponent;
