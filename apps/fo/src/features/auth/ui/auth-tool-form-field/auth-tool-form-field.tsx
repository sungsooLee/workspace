import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';
import { isFunction } from 'lodash';

import { IcoPhone02, IcoMail } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { RadioCard } from '@learnway/ui';

//import styles from './auth-tool-form-field.module.css';
import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

export const AUTH_TOOL_TYPE = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
};
export type AUTH_TOOL_TYPE = (typeof AUTH_TOOL_TYPE)[keyof typeof AUTH_TOOL_TYPE];

interface AuthToolFormFieldComponentProps {
  value?: AUTH_TOOL_TYPE;
  onChange?: (value: AUTH_TOOL_TYPE) => void;
  className?: string;
}

function AuthToolFormFieldComponent({
  value,
  onChange,
  className,
}: AuthToolFormFieldComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.start, 'auth--signup-select')} role="radiogroup">
      <RadioCard
        value={value}
        options={[
          {
            value: AUTH_TOOL_TYPE.PHONE,
            label: (
              <div>
                <IcoPhone02 width={48} height={48} className="ico1" />
                <span>휴대폰 인증</span>
              </div>
            ),
          },
          {
            value: AUTH_TOOL_TYPE.EMAIL,
            label: (
              <div>
                <IcoMail width={48} height={48} className="ico2" />
                <span>이메일 인증</span>
              </div>
            ),
          },
        ]}
        onValueChange={(value: string) => isFunction(onChange) && onChange(value as AUTH_TOOL_TYPE)}
      />
    </div>
  );
}

export const AuthToolFormField = AuthToolFormFieldComponent;
