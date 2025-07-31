import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';

import {
  useApproveAccountUser,
  useFetchUser,
  useRejectAccountUser,
} from '@entities/users/service/users.hook';
import { TenantUserApplicationDetail } from '@features/platform-management/tenant';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/tenant/user/application-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const userUuid = routerState.location.state?.userUuid;

  const { openModal, confirm: confirmModal, alert } = useModal();
  const { data: userData } = useFetchUser(userUuid);
  const { approve } = useApproveAccountUser({});
  const { reject } = useRejectAccountUser({});
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const openChangeUserEnableModal = (isApproval: boolean) => {
    confirmModal({
      title: isApproval ? t('승인 하시겠습니까?') : t('반려 하시겠습니까?'),
      content: isApproval ? (
        <p>{t('회원가입 신청을 승인하면 로그인 및 정상적인 서비스 이용을 할 수 있습니다.')}</p>
      ) : (
        <p>{t('회원가입 신청을 반려하면 정상적으로 서비스 이용을 할 수 없습니다.')}</p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          if (isApproval) {
            // 승인
            approve(
              { uuids: [userUuid] },
              {
                onSuccess: () => {
                  router.navigate({ to: '/platform/tenant/user' });
                },
              },
            );
          } else {
            // 반려
            reject(
              { uuids: [userUuid] },
              {
                onSuccess: () => {
                  router.navigate({ to: '/platform/tenant/user' });
                },
              },
            );
          }
        }
      },
    });
  };

  useEffect(() => {
    if (userData && userData.enabledDate) setIsEnabled(true);
  }, [userData]);

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            label={t('LABEL.button.list')}
            variant="gray2"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/tenant/user' })}
          />
        </LinkBox>
        {!isEnabled && (
          <>
            <Button
              label={t('반려')}
              variant="gray2"
              size="sm"
              onClick={(e) => openChangeUserEnableModal(false)}
            />
            <Button
              label={t('승인')}
              variant="primary"
              size="sm"
              onClick={(e) => openChangeUserEnableModal(true)}
            />
          </>
        )}
      </ContentsButtons>
      <MainContents>
        <TenantUserApplicationDetail userData={userData} />
      </MainContents>
    </PageContainer>
  );
}
