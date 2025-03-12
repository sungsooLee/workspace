import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';
import { isFunction } from 'lodash';

import { IcoPhone02, IcoMail } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { RadioCard } from '@learnway/ui';

//import styles from './auth-tool-form-field.module.css';
import styles from '@learnway/styles/fo/features/auth/ui/auth-tool-form-field/auth-tool-form-field.module.css';

export type AuthTool = 'phone' | 'email';

interface AuthToolFormFieldComponentProps {
  value?: AuthTool;
  onChange?: (value: AuthTool) => void;
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
        options={[
          {
            value: 'type1',
            label: (
              <div>
                <IcoPhone02 width={48} height={48} className="ico1" />
                <span>휴대폰 인증</span>
              </div>
            ),
          },
          {
            value: 'type2',
            label: (
              <div>
                <IcoMail width={48} height={48} className="ico2" />
                <span>이메일 인증</span>
              </div>
            ),
          },
        ]}
        onValueChange={(value: string) => isFunction(onChange) && onChange(value as AuthTool)}
      />
    </div>
  );
}

export const AuthToolFormField = AuthToolFormFieldComponent;
