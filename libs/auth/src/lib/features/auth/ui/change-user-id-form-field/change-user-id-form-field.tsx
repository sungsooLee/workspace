import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { isFunction } from 'lodash';

import { cn } from '@learnway/shared';
import { Input, Button, InputProps, useModal } from '@learnway/ui';

//import styles from './auth-tool-form-field.module.css';
//import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

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

  const { open: openModal } = useModal();
  const { onChangeGuideText, ...restProps } = props;
  const handleChange = () => {
    openModal({
      width: isMobile ? undefined : 'sm',
      content: <ChangeUserIdModal widget={{}} />,
    });
    //onChangeGuideText && onChangeGuideText('아이디/이메일이 확인되었습니다.');
  };

  return (
    <>
      <Input {...props} readOnly />
      <Button variant="gray" size="lg" onClick={() => handleChange()}>
        {t('LABEL.UPDATE_EMAIL_ID')}
      </Button>
    </>
  );
}

export const ChangeUserIdFormField = ChangeUserIdFormFieldComponent;
