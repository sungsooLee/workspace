import { PhoneNumber } from '@learnway/ui';
import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useWatch } from 'react-hook-form';

/**
 * 전화 번호 form-field
 * @constructor
 */
const PhoneNumberFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ value, name, control, onFormChange }, _) => {
    const nationCode = useWatch({ control, name: 'nationCode' });
    /**
     * phone number 변경 이벤트
     * @param changeValue
     */
    const handleOnChange = (changeValue: PhoneNumber) => {
      onFormChange({ nationCode: changeValue.nationCode, [name]: changeValue.number });
    };

    return (
      <PhoneNumber
        value={{
          nationCode,
          number: value,
        }}
        onChange={handleOnChange}
      />
    );
  },
);

export const PhoneNumberFormField = PhoneNumberFormFieldComponent;
