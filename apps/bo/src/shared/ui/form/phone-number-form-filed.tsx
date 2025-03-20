import { PhoneNumber, PhoneNumberValue } from '@learnway/ui';
import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useWatch } from 'react-hook-form';
interface PhoneNumberFormFieldProps extends BaseFormFieldProps<string> {
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
    { value, control, onFormChange, fields = { nationCode: 'nationCode', number: 'number' } },
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
