import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';

import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { RadioCard } from '@learnway/ui';

import signupStyles from '../signup.module.css';

import { AuthToolFormField, AuthTool } from '../auth-tool-form-field/auth-tool-form-field';

interface LayoutComponentProps {
  children: ReactNode;
}

function SearchAccountFormComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();
  const [authTool, setAuthTool] = useState<AuthTool>('phone');
  const handleOnChangeAuthTool = (value: AuthTool) => {
    setAuthTool(value);
  };
  return (
    <>
      <div className={signupStyles.search_info}>
        <strong>본인인증</strong> 후<br /> 아이디를 확인 할 수 있습니다.
      </div>
      <AuthToolFormField value={authTool} onChange={(value) => handleOnChangeAuthTool(value)} />
    </>
  );
}

export const SearchAccountForm = SearchAccountFormComponent;
