import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';

import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

import { AuthForm, AuthFormData } from '../../../widgets/auth';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('account');

  const handleActiveTab = (value: string) => {
    setDefaultAuthValues({
      authToolType: 'phone',
      userId: '',
      name: '배성련',
      birthday: '19781223',
      phoneNumber: '01093432161',
      phoneNumberLocale: '',
      email: '',
      verificationCode: 'dek479',
    });

    setSelectedTabKey(value);
  };

  const items = useCreation(
    () => [
      {
        title: '아이디 찾기',
        key: 'account',
        content: <></>,
      },
      {
        title: '비밀번호 찾기',
        key: 'password',
        content: <></>,
      },
    ],
    [],
  );

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <Tabs
          selectedTabKey={selectedTabKey}
          items={items}
          type="fill"
          variant="primary"
          onActiveTab={handleActiveTab}
        />

        <div className={styles.search_info}>
          {selectedTabKey === 'account'
            ? `본인인증 후 아이디를 확인 할 수 있습니다.`
            : `본인인증 후 비밀번호를 재설정 할 수 있습니다.`}
        </div>

        <AuthForm defaultValues={defaultAuthValues} />
      </div>
    </div>
  );
}
