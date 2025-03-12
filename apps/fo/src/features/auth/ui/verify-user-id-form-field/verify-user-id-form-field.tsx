import { useTranslation } from 'react-i18next';
import { useBoolean } from 'react-use';
import { isFunction } from 'lodash';

import { cn } from '@learnway/shared';
import { Input, Button, InputProps } from '@learnway/ui';

//import styles from './auth-tool-form-field.module.css';
import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

interface VerifyUserIdFormFieldComponentProps extends InputProps {
  className?: string;
  onVerify?: (isSuccess: boolean) => void;
}

function VerifyUserIdFormFieldComponent({
  onVerify,
  ...props
}: VerifyUserIdFormFieldComponentProps) {
  const { t } = useTranslation();
  const [checkedUserId, setVerifyedUserId] = useBoolean(false);

  const handleVerify = () => {
    if (isFunction(onVerify)) {
      onVerify(true);
    }
  };

  return (
    <>
      <Input disabled={checkedUserId} {...props} />
      <Button variant="gray" size="lg" onClick={() => handleVerify()}>
        아이디확인
      </Button>
    </>
  );
}

export const VerifyUserIdFormField = VerifyUserIdFormFieldComponent;
