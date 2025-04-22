import { useTranslation } from 'react-i18next';
import { useBoolean } from 'react-use';
import { isFunction } from 'lodash';

import { cn } from '@learnway/shared';
import { Input, Button, InputProps } from '@learnway/ui';

//import styles from './auth-tool-form-field.module.css';
//import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

interface FormFieldComponentProps {
  onChangeGuideText?: (text: string) => void;
}

interface ChangeUserIdFormFieldComponentProps extends InputProps, FormFieldComponentProps {
  className?: string;
  //onChange?: (isSuccess: boolean) => void;
}

function ChangeUserIdFormFieldComponent({
  onChange,
  ...props
}: ChangeUserIdFormFieldComponentProps) {
  const { t } = useTranslation();
  const [checkedUserId, setChangeedUserId] = useBoolean(false);
  const { onChangeGuideText, ...restProps } = props;
  const handleChange = () => {
    if (isFunction(onChange)) {
      //onChange(true);
    }
    onChangeGuideText && onChangeGuideText('아이디/이메일이 확인되었습니다.');
  };

  return (
    <>
      <Input disabled={checkedUserId} {...props} />
      <Button variant="gray" size="lg" onClick={() => handleChange()}>
        아이디확인
      </Button>
    </>
  );
}

export const ChangeUserIdFormField = ChangeUserIdFormFieldComponent;
