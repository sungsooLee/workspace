import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { Tabs, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { AuthForm, AuthFormData, pageRouteConfig } from '../../../features/auth';
import { useAsyncFetchEmail } from '../../../entities/user';
import { EmbededAlert } from '../../../shared/ui';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateSearch: {
      tabKey: {
        format: 'string',
        default: 'account',
        conditions: [
          {
            fn: (values: any) => !['account', 'password'].includes(values.tabKey),
          },
        ],
      },
    },
    meta: {
      title: 'LABEL.ACCOUNT_PASSWORD_SEARCH',
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();

  const { search } = useCurrentRoute(Route);
  const router = useRouter();
  const { alert } = useModal();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();
  const [selectedTabKey, setSelectedTabKey] = useState<'account' | 'password'>(
    search?.tabKey ?? 'account',
  );

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleTabChange = (value: any) => {
    setDefaultAuthValues({
      authToolType: 'PHONE',
      userId: '',
      name: '',
      birthday: '',
      phoneNumber: '',
      nationCode: 'KR',
      email: '',
      verificationCode: '',
    });

    setSelectedTabKey(value);
  };

  const items = useCreation(
    () => [
      {
        title: t('LABEL.SEARCH_ACCOUNT'),
        key: 'account',
        content: <></>,
      },
      {
        title: t('LABEL.SEARCH_PASSWORD'),
        key: 'password',
        content: <></>,
      },
    ],
    [],
  );

  const handleSuccess = (data: any) => {
    if (selectedTabKey === 'password') {
      router.navigate({ to: '/search-account/change-password', state: { ...data } });
      return;
    }

    asyncFetchEmail(
      {
        name: data.name,
        birthday: data.birthday,
        ...(data.authToolType === 'PHONE'
          ? { phoneNumber: data.phoneNumber }
          : { email: data.email }),
      },
      {
        onSuccess: (data, variables, context) => {
          router.navigate({
            to: '/search-account/result',
            state: { email: data.email },
          });
        },
        onError: (error: any) => {
          // 인증 성공 후 사용자 정보 조회 실패
          alert({
            title: 'MESSAGE.INVALID_INPUT_INFORMATION',
            description: 'MESSAGE.INVALID_INPUT_INFORMATION_DESCRIPTION',
          });
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
          onTabChange={handleTabChange}
        />

        <EmbededAlert className={styles.search_info} hiddenIcon>
          {t(
            selectedTabKey === 'account'
              ? `MESSAGE.CAN_CHECK_ACCOUNT_AFTER_VERIFYING`
              : `MESSAGE.CAN_UPDATE_PASSWORD_AFTER_VERIFYING`,
          )}
        </EmbededAlert>

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
