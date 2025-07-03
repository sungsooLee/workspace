import { forwardRef } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

import { BaseFormFieldProps } from '@learnway/hooks';
import { PhoneNumber, PhoneNumberValue, Button, useModal } from '@learnway/ui';

import { ChangePhoneNumberModal } from './change-phone-number-modal';

interface PhoneNumberFormFieldProps extends BaseFormFieldProps<string> {
  fields?: {
    nationCode: string;
    number: string;
  };
}

//NLP_FO_MYP_1007
const PhoneNumberFormFieldComponent = forwardRef<HTMLDivElement, PhoneNumberFormFieldProps>(
  (
    {
      value,
      control,
      onFormChange,
      fields = { nationCode: 'nationCode', number: 'number' },
      disabled,
    },
    _,
  ) => {
    const { t } = useTranslation();
    const { open: openModal } = useModal();

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
      <>
        <PhoneNumber
          value={{
            nationCode,
            number: value,
          }}
          onChange={handleOnChange}
          readOnly
          disabled
        />
        <Button
          variant="gray"
          size="lg"
          onClick={() => {
            openModal({
              width: isMobile ? undefined : 'sm',
              content: <ChangePhoneNumberModal widget={{}} />,
              onClose: (data: any) => {
                if (!data) {
                  return;
                }
                handleOnChange(data);
              },
            });
          }}
          disabled={disabled}
        >
          {t('LABEL.common.phoneNumberChange')}
        </Button>
      </>
    );
  },
);

export const ChangePhoneNumberFormField = PhoneNumberFormFieldComponent;
