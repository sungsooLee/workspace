import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@widgets/layout';

import { Tabs, Button } from '@learnway/ui';

import {
  TenantUserRegist,
  TenantUserList,
  TenantUserRegistApplicationList,
} from '@features/tenant';
import { TenantUserApplicationDetail } from '@features/tenant';

export const Route = createFileRoute('/_layout/platform/tenant/user/application-detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

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
        <Button
          label={t('반려')}
          variant="gray2"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
        <Button
          label={t('승인')}
          variant="primary"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
      </ContentsButtons>
      <MainContents>
        <TenantUserApplicationDetail />
      </MainContents>
    </PageContainer>
  );
}
