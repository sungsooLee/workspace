import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';

import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { RadioCard } from '@learnway/ui';

import signupStyles from '../signup.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function SearchPasswordFormComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={signupStyles.search_info}>
        <strong>본인인증</strong> 후<br /> 비밀번호를 재설정 할 수 있습니다.
      </div>
      <div className={signupStyles.signup_select} role="radiogroup">
        <RadioCard
          className={signupStyles.radio_card}
          options={[
            {
              value: 'type1',
              label: (
                <div>
                  <IcoPhone02 width={48} height={48} className={signupStyles.ico1} />
                  <span>휴대폰 인증</span>
                </div>
              ),
            },
            {
              value: 'type2',
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
    </>
  );
}

export const SearchPasswordForm = SearchPasswordFormComponent;
