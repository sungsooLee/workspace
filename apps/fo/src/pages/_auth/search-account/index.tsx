import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';

import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';

import { AuthForm, AuthFormData } from '../../../widgets/auth';
import { useAsyncFetchEmail } from '../../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>('account');

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleActiveTab = (value: string) => {
    setDefaultAuthValues({
      authToolType: 'phone',
      userId: '',
      name: '',
      birthday: '',
      phoneNumber: '',
      phoneNumberLocale: '',
      email: '',
      verificationCode: '',
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

  const handleSuccess = (data: any) => {
    asyncFetchEmail(
      {
        name: data.name,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: (data, variables, context) => {
          router.navigate({
            to: '/search-account/result',
            state: { email: data.email },
          });
        },
        onError: (error: any) => {
          console.log('asyncFetchAccount error', error);
        },
      },
    );
  };

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

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

        <AuthForm
          defaultValues={defaultAuthValues}
          includeUserId={selectedTabKey === 'password'}
          onSuccess={(data: any) => handleSuccess(data)}
          onCancel={() => handleCancel()}
        />
      </div>
    </div>
  );
}
