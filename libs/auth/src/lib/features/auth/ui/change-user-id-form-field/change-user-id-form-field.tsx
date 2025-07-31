import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui/button';
import { Input, InputProps } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { ChangeUserIdModal } from './change-user-id-modal';

interface FormFieldComponentProps {
  onChangeGuideText?: (text: string) => void;
}

//NLP_FO_MYP_1007
interface ChangeUserIdFormFieldComponentProps extends InputProps, FormFieldComponentProps {
  className?: string;
  //onChange?: (isSuccess: boolean) => void;
}

function ChangeUserIdFormFieldComponent({
  onChange,
  ...props
}: ChangeUserIdFormFieldComponentProps) {
  const { t } = useTranslation();

  const { openModal } = useModal();
  const { onChangeGuideText, ...restProps } = props;

  // Withdrawal of membership
  return (
    <>
      <Input {...props} readOnly />
      <Button
        variant="gray"
        size="lg"
        onClick={() => {
          openModal({
            width: isMobile ? undefined : 'sm',
            content: <ChangeUserIdModal widget={{}} />,
            onClose: (email?: any) => {
              if (!email) {
                return;
              }
              const changeEvent = {
                target: {
                  value: email,
                },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange?.(changeEvent);
            },
          });
        }}
      >
        {t('LABEL.common.changeAccount')}
      </Button>
    </>
  );
}

export const ChangeUserIdFormField = ChangeUserIdFormFieldComponent;
