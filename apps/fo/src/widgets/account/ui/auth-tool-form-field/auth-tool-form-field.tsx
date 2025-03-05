import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';

import { IcoPhone02, IcoMail } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { RadioCard } from '@learnway/ui';

import signupStyles from '../signup.module.css';

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
    <div className={className} role="radiogroup">
      <RadioCard
        className={signupStyles.radio_card}
        value={value}
        options={[
          {
            value: 'phone',
            label: (
              <div>
                <IcoPhone02 width={48} height={48} className={signupStyles.ico1} />
                <span>휴대폰 인증</span>
              </div>
            ),
          },
          {
            value: 'email',
            label: (
              <div>
                <IcoMail width={48} height={48} className={signupStyles.ico2} />
                <span>이메일 인증</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export const AuthToolFormField = AuthToolFormFieldComponent;
