import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { Tabs, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { AuthForm, AuthFormData } from '../../features/auth';
import { useAsyncFetchEmail } from '../../entities/authorization';
import { EmbededAlert } from '../../shared/ui';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';

/**
 * @description 아이디 찾기, 비밀번호 찾기 본인인증
 * @param enableTab 상단탭 노출 여부
 * @param hiddenIcon 안내영역 아이콘 노출여부
 * @returns
 */
export function SearchAccountPage({ route, enableTab = true, hiddenIcon = true }: any) {
  const { t } = useTranslation();
  const { state } = useCurrentRoute(route);
  const router = useRouter();
  const { alert } = useModal();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();
  const [selectedTabKey, setSelectedTabKey] = useState<'account' | 'password'>(
    state?.tabKey ?? 'account',
  );

  const { asyncFetch: asyncFetchEmail } = useAsyncFetchEmail();

  const handleActiveTab = (value: any) => {
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
        title: t('LABEL.common.searchAccount'),
        key: 'account',
        content: <></>,
      },
      {
        title: t('LABEL.common.searchPassword'),
        key: 'password',
        content: <></>,
      },
    ],
    [],
  );

  const handleSuccess = (data: any) => {
    if (selectedTabKey === 'password') {
      router.navigate({ to: '/search-password/change-password', state: { ...data } });
      return;
    }

    // TODO ID 찾기 스펙 확인 필요..
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
            state: { email: data.email } as any,
          });
        },
        onError: (error: any) => {
          // 인증 성공 후 사용자 정보 조회 실패
          alert({
            title: 'LABEL.message.invalidInputInformation',
            content: 'LABEL.message.invalidInputInformationDescription',
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
        {enableTab && (
          <Tabs
            selectedTabKey={selectedTabKey}
            items={items}
            type="fill"
            variant="primary"
            onTabChange={handleActiveTab}
          />
        )}

        <EmbededAlert className={enableTab === false ? styles.dormant : ''} hiddenIcon={hiddenIcon}>
          {t(
            selectedTabKey === 'account'
              ? `LABEL.message.canCheckAccountAfterVerifying`
              : `LABEL.message.canUpdatePasswordAfterVerifying`,
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
