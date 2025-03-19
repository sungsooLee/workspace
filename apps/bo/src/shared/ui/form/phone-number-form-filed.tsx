import { PhoneNumber } from '@learnway/ui';
import { ChangeEvent, forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
interface PhoneNumberFormFieldProps {
  fields: {};
}

/**
 * 전화 번호 form-field
 * @constructor
 */
const PhoneNumberFormFieldComponent = forwardRef<HTMLDivElement, BaseFormFieldProps<string>>(
  ({ value, onChange, getValues, onFormChange }, ref) => {
    /**
     * phone number 변경 이벤트
     * @param event
     */
    const handleOnChange = (event?: ChangeEvent<HTMLInputElement>) => {};

    return null;
  },
);

export const PhoneNumberFormField = PhoneNumberFormFieldComponent;
