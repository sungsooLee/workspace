import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Input, InputProps } from '@learnway/ui/input';

//import styles from './auth-tool-form-field.module.css';
//import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { ChangePasswordModal } from './change-password-modal';

interface FormFieldComponentProps {
  onChangeGuideText?: (text: string) => void;
}

//NLP_FO_MYP_1007
interface ChangePasswordFormFieldComponentProps extends InputProps, FormFieldComponentProps {
  className?: string;
  //onChange?: (isSuccess: boolean) => void;
}

function ChangePasswordFormFieldComponent({
  onChange,
  ...props
}: ChangePasswordFormFieldComponentProps) {
  const { t } = useTranslation();

  const { openModal } = useModal();
  const { onChangeGuideText, ...restProps } = props;

  return (
    <>
      <Input {...props} readOnly />
      <Button
        variant="gray"
        size="lg"
        onClick={() => {
          openModal({
            width: isMobile ? undefined : 'sm',
            content: <ChangePasswordModal />,
            onClose: (password?: any) => {
              if (!password) {
                return;
              }
              const changeEvent = {
                target: {
                  value: password,
                },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange?.(changeEvent);
            },
          });
        }}
      >
        {t('LABEL.common.passwordChange')}
      </Button>
    </>
  );
}

export const ChangePasswordFormField = ChangePasswordFormFieldComponent;
