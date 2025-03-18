import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { Tabs, useModal } from '@learnway/ui';
import type { PhoneNumberValue } from '@learnway/ui';
import { cn, z } from '@learnway/shared';

import { AuthForm, AuthFormData, AUTH_TOOL_TYPE, pageRouteConfig } from '../../../features/auth';
import { useAsyncFetchEmail } from '../../../entities/user';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
  validateSearch: z.object({ tabKey: z.enum(['account', 'password']).default('account') }),
  ...pageRouteConfig({
    validateSearch: z.object({ tabKey: z.enum(['account', 'password']).default('account') }),
    meta: {
      title: 'LABEL.ACCOUNT_PASSWORD_SEARCH',
    },
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const { tabKey } = Route.useSearch();
  const router = useRouter();
  const { alert } = useModal();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();
  const [selectedTabKey, setSelectedTabKey] = useState<string>(tabKey);

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleActiveTab = (value: string) => {
    setDefaultAuthValues({
      authToolType: AUTH_TOOL_TYPE.PHONE,
      userId: '',
      name: '',
      birthday: '',
      phoneNumber: {} as PhoneNumberValue,
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
        ...(data.authToolType === AUTH_TOOL_TYPE.PHONE
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
          onActiveTab={handleActiveTab}
        />

        <div
          className={styles.search_info}
          onClick={() =>
            router.navigate({
              to: '/change-password',
              state: {
                authToolType: 'PHONE',
                name: '아무개',
                birthday: '19781223',
                phoneNumber: '01093432161',
              },
            })
          }>
          {t(
            selectedTabKey === 'account'
              ? `MESSAGE.CAN_CHECK_ACCOUNT_AFTER_VERIFYING`
              : `MESSAGE.CAN_UPDATE_PASSWORD_AFTER_VERIFYING`,
          )}
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
